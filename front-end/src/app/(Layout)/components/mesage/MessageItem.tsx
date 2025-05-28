'use client'
import { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { IMessageData } from '@/app/interfaces/messages';
import axios from 'axios';

interface IProps {
    item: IMessageData,
    loading: boolean
}

const WrapStyled = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    alignSelf: 'stretch',
    padding: '0px',
    marginBottom: '39px',
    [theme.breakpoints.down('md')]: {
        gap: '10px',
        marginBottom: '15px'
    }
}));

const BotIconStyled = styled('img')(({ theme }) => ({
    width: '28px',
    height: '28px',
    [theme.breakpoints.down('md')]: {
        width: '20px',
        height: '20px',
    }
}));

const LoadingIconStyled = styled('div')(({ theme }) => ({
    width: '28px',
    height: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        width: '20px',
        height: '20px',
    }
}));


const UserIconStyled = styled('img')(({ theme }) => ({
    width: '28px',
    height: '28px',
    borderRadius: '28px',
    boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.10) inset',
    [theme.breakpoints.down('md')]: {
        width: '20px',
        height: '20px',
    }
}));

const BotTypographyStyled = styled(Box)(({ theme }) => ({
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    padding: '12px 16px',
    borderRadius: '8px',
    background: '#F8F9FA',
    border: '1px solid #cbcbc7',
    color: '2f2e2e',
    [theme.breakpoints.down('md')]: {
        fontSize: '10px',
        lineHeight: '16px',
        padding: '12px 16px'
    }
}));

const UserTypographyStyled = styled(Typography)(({ theme }) => ({
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#FFF',
    ppadding: '12px 16px',
    borderRadius: '8px',
    background: '#06F',
    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.05), 0px 0px 1px 0px rgba(0, 0, 0, 0.40)',
    [theme.breakpoints.down('md')]: {
        fontSize: '10px',
        lineHeight: 1.3,
        padding: '12px 16px'
    }
}));

// components
const MessageItem = ({ item, loading }: IProps) => {
    const { setting, threadId } = useSelector(
        (state: any) => state.bot
    );

    const [likeBtn, setLikeBtn] = useState(false);
    const [dislikeBtn, setDisLikeBtn] = useState(false);

    const onHandleFeedback = async (feedback: boolean) => {
        try {
            if (item.interaction_id !== undefined) {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/public/chatbot/feedback`,
                    {
                        "threadId": threadId,
                        "interaction": item.interaction_id,
                        "feedback": true,
                        "source": "chatbot"
                    }
                );

                if (feedback) {
                    setLikeBtn(true);
                    setDisLikeBtn(false);
                } else {
                    setLikeBtn(false);
                    setDisLikeBtn(true);
                }
            }
        } catch (e) {
            console.log('onHandleFeedback', e);
        }
    }

    return (
        <WrapStyled justifyContent={item.type == 0 ? "start" : "end"}>
            {item.type === 0 && <BotIconStyled src={setting.botIcon === undefined ? "/images/bot-icon.png" : setting.botIcon} />}
            {item.type === 1 && <UserIconStyled src={setting.userIcon === undefined ? "/images/user-icon.png" : setting.userIcon} />}
            {loading === false && item.type === 0 &&
                <BotTypographyStyled fontSize={`${setting.fontSize}px !important`}>
                    <div dangerouslySetInnerHTML={{ __html: item.data }} className='messageItem' />
                    {item.url && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingTop: '15px',
                            marginRight: '5px',
                            justifyContent: 'end'
                        }}>
                            <a href={item.url} download target="_blank" rel="noopener noreferrer" style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '7px',
                                borderRadius: '0.5rem',
                                border: '1px solid #cbcbc7',
                                background: likeBtn ? "#9b9b9b" : "white"
                            }}>
                                <img
                                    src="/images/download.svg"
                                    alt="Download"
                                    width={`13px`}
                                    height={`13px`}
                                />
                            </a>
                        </div>
                    )}
                    {item.interaction_id !== undefined && (
                        <div style={{
                            display: 'flex',
                            gap: '5px',
                            justifyContent: 'end'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: '15px'
                            }}>
                                <a href={item.url} download target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '7px',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #cbcbc7',
                                    background: likeBtn ? "#9b9b9b" : "white"
                                }}
                                    onClick={() => {
                                        onHandleFeedback(true);
                                    }}
                                >
                                    <img
                                        src={likeBtn ? "/images/like-hover.svg" : "/images/like.svg"}
                                        alt="Like"
                                        width={`13px`}
                                        height={`13px`}
                                    />
                                </a>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                paddingTop: '15px'
                            }}>
                                <a href={item.url} download target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '7px',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #cbcbc7',
                                    background: dislikeBtn ? "#9b9b9b" : "white"
                                }}
                                    onClick={() => {
                                        onHandleFeedback(false);
                                    }}>
                                    <img
                                        src={dislikeBtn ? "/images/dislike-hover.svg" : "/images/dislike.svg"}
                                        alt="Dislike"
                                        width={`13px`}
                                        height={`13px`}
                                    />
                                </a>
                            </div>
                        </div>
                    )}
                </BotTypographyStyled>}
            {loading === false && item.type === 1 &&
                <UserTypographyStyled fontSize={`${setting.fontSize}px !important`} style={{
                    background: setting.primaryColor !== undefined ? setting.primaryColor : '#06F'
                }}>{item.data}</UserTypographyStyled>}
            {loading === true && <LoadingIconStyled>
                <span className="dot-flashing inline-block" />
            </LoadingIconStyled>}
        </WrapStyled>
    )
}

export default MessageItem;
