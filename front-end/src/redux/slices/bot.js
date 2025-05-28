import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  setting: {
    botName: "Bot",
    welcomeMessage: "Welcome! &#128075; What can I help you with today?",
    primaryColor: "",
    textColor: "",
    height: 80,
    fontSize: 14,
    botIcon: "/images/bot-icon.png",
    userIcon: "/images/user-icon.png",
  },
  ready: false,
  vendorId: 0,
  messages: [],
  threadId: "",
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getSetting(state, action) {
      state.isLoading = false;
      state.setting = action.payload;
    },

    getThreadId(state, action) {
      state.isLoading = false;
      state.threadId = action.payload;
    },

    getMessages(state, action) {
      if (action.payload.type === 0) {
        state.isLoading = false;
      }
      state.messages.push(action.payload);
    },

    getInitialize(state, action) {
      state.isLoading = false;
      state.setting = action.payload.setting;
      state.vendorId = action.payload.vendorId;
      state.messages = [action.payload.message];
      state.ready = true;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSetting() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/api/user/profile");
      dispatch(slice.actions.getSetting(response.data.setting));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAIResponse(prompt, vendorId, threadId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log("vendorId", vendorId);
      const accessToken = localStorage.getItem("accessToken");
      dispatch(slice.actions.getMessages({ type: 1, data: prompt }));
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/public/chatbot/process-vendor-query`,
        {
          threadId: threadId,
          query: prompt,
          chatToken: accessToken,
        }
      );
      dispatch(
        slice.actions.getMessages({
          type: 0,
          data: response.data.greeting,
          url:
            response.data.file_url === undefined
              ? null
              : response.data.file_url,
          interaction_id: response.data.interaction_id,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getInitialize(accessToken) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      localStorage.removeItem("accessToken");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/public/chatbot/get/${accessToken}`
      );

      dispatch(
        slice.actions.getInitialize({
          setting: response.data.data.customizationdata,
          vendorId: response.data.data.vendorid,
          message: {
            type: 0,
            data: response.data.data.customizationdata.welcomeMessage !== undefined ? response.data.data.customizationdata.welcomeMessage: "Welcome! &#128075; What can I help you with today?",
          },
        })
      );

      localStorage.setItem("accessToken", accessToken);

      const threadData = localStorage.getItem("threadData");
      const data = JSON.parse(threadData);

      if (
        data !== null &&
        data.threadId !== null &&
        data.sessionId !== undefined
      ) {
        // dispatch(slice.actions.getThreadId(data.threadId));
        // Function of remove sessionId
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/public/chatbot/end-session/${data.sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        // Function END
      }

      // Function of make new threadId
      const uuid = uuidv4();
      const sessionData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/public/chatbot/start-session`,
        {
          threadId: uuid,
          query: "New Thread",
          chatToken: accessToken,
        }
      );

      if (sessionData.data.sessionId !== undefined) {
        localStorage.setItem(
          "threadData",
          JSON.stringify({
            sessionId: sessionData.data.sessionId,
            threadId: uuid,
          })
        );
        dispatch(slice.actions.getThreadId(uuid));
      }
      // Function END
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
