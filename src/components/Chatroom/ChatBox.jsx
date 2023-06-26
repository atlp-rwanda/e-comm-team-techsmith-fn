import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import Participants from './Participants';
import { defaultPhoto } from '../../constants';
import {
  user,
  setServerMessages,
  updateMessages,
  updateActiveUsers,
  removeActiveUser,
  addActiveUser
} from '../../states/features/chat/chatSlice';
import { socket } from '../../socket';
import { removeDuplicates } from '../../utils/Arrays';
import { MessageField } from './Message';
import Loading from '../Loading';

const ChatBox = () => {
  const participantsRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => {
    return state.chat.activeUsers;
  });

  const newUser = useSelector((state) => {
    return state.chat.newUser;
  });

  const serverMessages = useSelector((state) => {
    return state.chat.messages;
  });

  const displayNotification = () => {
    const notification = document.querySelector('.chatbox_notifications');
    const chatroomMain = document.querySelector('.chatroom_main');
    notification.classList.remove('hidden');
    chatroomMain.classList.remove('h-[90%]');
    chatroomMain.classList.add('h-[75%]');
    setTimeout(() => {
      notification.classList.add('hidden');
      chatroomMain.classList.remove('h-[75%]');
      chatroomMain.classList.add('h-[90%]');
    }, 3000);
  };

  useEffect(() => {
    socket.emit('joinChat', user);
    socket.on('activeUsers', (data) => {
      dispatch(updateActiveUsers(data));
      setActiveUsers(removeDuplicates(data));
    });
  }, []);

  useEffect(() => {
    setActiveUsers(removeDuplicates(users));
  }, [users]);

  useEffect(() => {
    socket.on('serverMessages', (data) => {
      dispatch(setServerMessages(data));
    });
  }, []);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(updateMessages(data));
    });
  }, []);

  useEffect(() => {
    const nonDuplicateMessages = removeDuplicates(serverMessages);
    setMessages(nonDuplicateMessages);
  }, [serverMessages]);

  useEffect(() => {
    socket.on('newUser', (data) => {
      dispatch(addActiveUser(data));
      setActiveUsers([...activeUsers, data]);
      if (data.user.email !== user.email) {
        displayNotification();
      }
    });
  }, []);

  console.log(activeUsers)

  return (
    <div className='chatbox_container sticky z-999 w-10/12 mx-auto h-[90vh] flex flex-col items-center my-8 shadow-md rounded-lg screen-mid:w-[95%] screen-base:h-[120vh]'>
      <div className='chatbox_notifications my-6 hidden w-fit items-center justify-center duration-100 ease-in-out'>
        <p className='p-4 rounded-lg bg-green-500 text-white text-[1.6rem]'>
          {newUser ? newUser.user.name : 'A user'} has joined that chat!
        </p>
      </div>
      <section className='chatbox_header w-full flex items-center h-full max-h-[15rem] justify-between px-8 py-6 bg-slate-500 screen-mid:flex-col gap-4'>
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
        <p className='participant_room_item hidden py-2 px-8 w-fit rounded-[1rem] bg-white items-center text-[1.6rem] screen-mid:flex justify-center'>
          Techsmith Community
        </p>
      </section>
      <section
        className='chatbox_chatroom w-full h-full grid grid-cols-3 p-8 screen-mid:flex screen-base:base-chatroom'
        style={{
          gridTemplateColumns: '20% 60% 20%'
        }}
      >
        <div className='chatroom_rooms screen-mid:hidden'>
          <Rooms />
        </div>
        <section className='chatroom_main flex flex-col justify-between gap-4 px-4 border-x-2 border-primary h-[90%] overflow-y-hidden screen-mid:mid-chatbox screen-base:h-[80%]'>
          {messages.length <= 0 ? (
            <div className='min-h-[80vh] flex items-center justify-center'>
              <Loading width={50} />
            </div>
          ) : (
            <MessageList messages={messages} />
          )}
          <div>
            <MessageField />
          </div>
        </section>
        <div className='chatroom_participants w-full px-4'>
          <Participants ref={participantsRef} active users={activeUsers} />
        </div>
      </section>
    </div>
  );
};

const Rooms = () => {
  return (
    <div className='participants_container w-full max-w-[60rem] flex flex-col items-center gap-8 px-8 screen-mid:hidden'>
      <div className='participants_room flex flex-col gap-4 my-6'>
        <h3 className='text-[2.2rem] flex text-start items-center gap-4 font-bold screen-mid:flex-col'>
          <FontAwesomeIcon icon={faComments} />
          Chat rooms
        </h3>
        <ul className='participants_room_list flex flex-col items-start'>
          {Array(1)
            .fill()
            .map((_, i) => {
              return (
                <li
                  key={i}
                  className='participant_room_item w-full flex items-center text-[1.6rem]'
                >
                  Techsmith Community
                </li>
              );
            })}
        </ul>
      </div>
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
      className='chatroom_main_messages w-full flex flex-col gap-6 h-full overflow-y-auto'
      onScroll={handleScroll}
    >
      {messages.map((message, i) => {
        const { user: sender, messageBody, createdAt } = message;
        const own = message?.user?.id === user?.id;
        return (
          <Message
            key={i}
            own={own}
            avatar={defaultPhoto}
            message={messageBody}
            timestamp={createdAt}
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
export { Message, MessageList }
