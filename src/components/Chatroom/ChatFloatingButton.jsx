import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

const ChatFloadtingButton = () => {
  const { pathname } = useLocation();

  if (pathname === '/chat' || pathname === 'chat/room' || pathname === '/login' || pathname === '/signup') return null;

  return (
    <div className='w-fit rounded-[50%] z-999'>
      <Button
        value={
          <span>
            <FontAwesomeIcon
              icon={faMessage}
              className='w-[3rem] h-[3rem] text-[3rem]'
            />
          </span>
        }
        className='primary-btn p-8 w-fit rounded-[50%]'
        route='/chat'
      />
    </div>
  );
};

export default ChatFloadtingButton;
