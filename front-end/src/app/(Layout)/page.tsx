'use client'
import { useState, useEffect } from 'react';
import { Box, styled, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import PageContainer from '@/app/(Layout)/components/container/PageContainer';
import { getAIResponse } from '@/redux/slices/bot';
import MessageItem from '@/app/(Layout)/components/mesage/MessageItem';
import { IMessageData } from '@/app/interfaces/messages';
import { useRouter } from 'next/router';
import { Landscape } from '@mui/icons-material';

const InputBoxStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '50px',
  padding: '10px 12px',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: '12px',
  background: '#FFF',
  boxShadow: '0px 16.667px 29.167px 0px rgba(0, 0, 0, 0.08), 0px 4.167px 8.333px 0px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(16.66666603088379px)',
  position: 'absolute',
  bottom: '36px',
  width: 'calc(100% - 69px)',
  [theme.breakpoints.down('md')]: {
    height: '46px',
    padding: '10px 12px',
    width: 'calc(100% - 48px)',
    bottom: '15px',
    borderRadius: '5px',
  }

}));

const IconStyled = styled('img')(({ theme }) => ({
  width: '20px',
  height: '20px',
  [theme.breakpoints.down('md')]: {
    width: '15px',
    height: '15px',
  }
}));

const CustomTextField = styled((props: any) => <TextField {...props} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: "ADB5BD",
    opacity: '0.8',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontSeight: 400,
    lineHeight: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '13px',
      lineHeight: '16px',
    }
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    opacity: '1',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontStyle: 'normal',
    fontSeight: 400,
    lineHeight: '20px',
    [theme.breakpoints.down('md')]: {
      fontSize: '13px',
      lineHeight: '16px',
    }
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: '#000',
  },
  width: 'calc(100% - 60px)'
}));

const WrapStyled = styled(Box)(({ theme }) => ({
  padding: "32px 24.5px", height: "calc(100vh - 115px)", position: "relative",
  [theme.breakpoints.down('md')]: {
    padding: "25px 2px 14.5px 25px", height: "calc(100vh - 115.38px)",
  }
}));
// components
const Chat = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const { messages, vendorId, threadId, setting, isLoading } = useSelector(
    (state: any) => state.bot
  );

  const onSubmit = () => {
    if (vendorId !== undefined) {
      dispatch(getAIResponse(message, vendorId, threadId) as any);
      setMessage('');
    } else {
      console.log('error');
    }
  }

  return (
    <PageContainer title="AskIot Chatbot" description="AskIot Chatbot">
      <WrapStyled style={{
        background: setting.backgroundColor !== undefined ? setting.backgroundColor : '#FFF'
      }}>
        <Box className="scrollbar">
          {
            messages.map((message: IMessageData, index: number) => <MessageItem key={index} item={message} loading={false}/>)
          }
          {isLoading === true && <MessageItem item={{ type: 0, data : '', url: ''}} loading={true}/>}
        </Box>
        <InputBoxStyled>
          <IconStyled src="/images/bot-icon.png" />
          <CustomTextField
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            placeholder="Ask me anything."
            value={message}
            onChange={(e: any) => {
              setMessage(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                e.preventDefault(); // Prevent the default behavior of the Enter key (e.g., form submission)
                onSubmit();
              }
            }}
          />

          <IconStyled src="/images/paper-airplane.png" style={{ cursor: "pointer" }} onClick={onSubmit} />
        </InputBoxStyled>
      </WrapStyled>
    </PageContainer>
  )
}

export default Chat;
