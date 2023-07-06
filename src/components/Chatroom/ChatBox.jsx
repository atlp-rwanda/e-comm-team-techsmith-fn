import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { defaultPhoto } from '../../constants';
import {
  user,
  removeActiveUser,
  setMessages,
  updateMessages,
  setConversationModal
} from '../../states/features/chat/chatSlice';
import { socket } from '../../socket';
import { MessageField } from './Message';
import { removeDuplicateMessages, removeDuplicates } from '../../utils/Arrays';
import Rooms from './Rooms';

const ChatBox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { messages, roomId, conversationModal } = useSelector((state) => {
    return state.chat;
  });

  useEffect(() => {
    socket.on('roomMessages', (data) => {
      dispatch(setMessages(data));
    });
  }, [roomId]);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(updateMessages(data));
    });
  }, []);

  return (
    <div className='chatbox_container sticky z-999 w-10/12 mx-auto h-[85vh] flex flex-col items-center my-8 shadow-md rounded-lg screen-mid:w-[95%] screen-base:h-[120vh]'>
      <section className='chatbox_header w-full flex items-center h-[10rem] max-h-[10rem] justify-between px-8 py-6 bg-slate-500 screen-mid:flex-col gap-4'>
        <h1 className='text-[2.5rem] items-start font-black text-white screen-mid:text-[2rem] screen-base:text-[1.8rem]'>
          Techsmith Chatroom
        </h1>
        <Button
          route='/chat'
          onClick={() => {
            socket.emit('leave', user);
            dispatch(removeActiveUser(user));
            navigate('/chat');
          }}
          value='Leave chat'
          className='primary-btn py-4 px-8 w-fit text-[1.6rem] bg-primary text-white hover:bg-red-500 normal-case screen-mid:py-2'
        />
      </section>
      <section
        className='chatbox_chatroom w-full h-full grid grid-cols-2 p-8 screen-mid:flex screen-base:base-chatroom'
        style={{
          gridTemplateColumns: '30% 70%'
        }}
      >
        <div className='chatroom_rooms w-full screen-mid:hidden'>
          <Rooms />
        </div>
        {roomId ? (
          <section className='chatroom_main flex flex-col justify-between gap-4 px-4 border-x-2 border-primary h-[90%] overflow-y-hidden screen-mid:mid-chatbox screen-base:h-[80%]'>
            {messages.length <= 0 ? (
            <div className='min-h-[50vh] h-full flex flex-col gap-8 items-center justify-center'>
            <h3 className='text-[2rem] font-medium] text-center'>This one looks dry!! Send a message to break the ice</h3>
          </div>
          ) : (
            <MessageList messages={removeDuplicateMessages(messages)} />
          )}
          <div>
            <MessageField />
          </div>
          </section>
        ) : (
          <section className='chatroom_main flex flex-col justify-between gap-4 px-4 border-x-2 border-primary h-[90%] overflow-y-hidden screen-mid:mid-chatbox screen-base:h-[80%]'>
            {messages.length <= 0 ? (
            <div className='min-h-[50vh] h-full flex flex-col gap-8 items-center justify-center'>
            <h3 className='text-[2rem] font-medium] text-center'>Click on a user to start a conversation</h3>
            <Button value='Start a conversation' className='primary-btn normal-case text-[1.5rem] w-fit px-8 py-4' onClick={(e) => {
              e.preventDefault();
              dispatch(setConversationModal(!conversationModal));
            }} />
          </div>
          ) : (
            <MessageList messages={removeDuplicateMessages(messages)} />
          )}
          <div>
            <MessageField />
          </div>
          </section>
        )}
      </section>
    </div>
  );
};

const Message = ({ own, avatar, sender, message, timestamp }) => {
  return (
    <div
      className={`message_container w-full flex ease-in-out duration-100 ${
        own ? 'flex-row-reverse' : 'flex-row'
      } items-start gap-6`}
    >
      <div className='message_avatar shadow-md rounded-[50%]'>
        <img
          src={avatar}
          alt='User message avatar'
          className='w-full max-w-[4rem] overflow-hidden'
        />
      </div>
      <div
        className={`message_user_text flex flex-col ${
          own ? 'items-end' : 'items-start'
        }`}
      >
        <span
          className={`message_user_timestamp flex ${
            own ? 'flex-row-reverse' : 'flex-row'
          } items-center gap-4`}
        >
          <p className='message_user_name font-bold text-[1.5rem]'>{sender}</p>
          <p className='message_user_message font-light text-[1.2rem]'>
            {timestamp}
          </p>
        </span>
        <p
          className={`message_user_message text-[1.4rem] font-normal w-full bg-primary p-4 text-white rounded-b-[1.5rem] ${
            own
              ? 'text-justify max-w-[80%] rounded-tl-[1.5rem]'
              : 'text-left max-w-[80%] rounded-tr-[1.5rem]'
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const isUserAtBottomRef = useRef(true);

  useEffect(() => {
    scrollToLastVisibleMessage();
  }, [messages]);

  const scrollToLastVisibleMessage = () => {
    const messagesContainer = messagesContainerRef.current;
    const lastVisibleMessage = messagesContainer.lastElementChild;

    if (messagesContainer && lastVisibleMessage) {
      const containerHeight = messagesContainer.clientHeight;
      const lastMessageHeight = lastVisibleMessage.clientHeight;
      const totalScrollHeight = messagesContainer.scrollHeight;

      const scrollPosition =
        totalScrollHeight - (containerHeight - lastMessageHeight);

      if (isUserAtBottomRef.current) {
        messagesContainer.scrollTop = scrollPosition;
      }
    }
  };

  const handleScroll = () => {
    const messagesContainer = messagesContainerRef.current;

    if (messagesContainer) {
      const scrollPosition = messagesContainer.scrollTop;
      const containerHeight = messagesContainer.clientHeight;
      const totalScrollHeight = messagesContainer.scrollHeight;

      const scrollBottom =
        totalScrollHeight - (scrollPosition + containerHeight);

      isUserAtBottomRef.current = scrollBottom < 1;
    }
  };

  return (
    <div
      ref={messagesContainerRef}
      className='chatroom_main_messages w-full flex flex-col gap-6 h-[90%] overflow-y-auto'
      onScroll={handleScroll}
    >
      {removeDuplicates(messages).map((message, i) => {
        const { user: sender, messageBody, timestamp } = message;
        const own = message?.user?.id === user?.id;
        return (
          <Message
            key={i}
            own={own}
            avatar={defaultPhoto}
            message={messageBody}
            timestamp={timestamp}
            sender={sender.name}
          />
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

Message.propTypes = {
  own: PropTypes.bool.isRequired,
  avatar: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default ChatBox;
export { Message, MessageList };
