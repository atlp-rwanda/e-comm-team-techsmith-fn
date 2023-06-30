import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { defaultPhoto } from '../../constants';
import Button from '../Button';
import {
  user,
  updateActiveUsers,
  setServerMessages
} from '../../states/features/chat/chatSlice';
import { socket } from '../../socket';

const JoinChat = () => {
  const dispatch = useDispatch();
  const [activeUsers, setActiveUsers] = useState([]);

  useEffect(() => {
    socket.emit('joinChat', user);
    socket.on('activeUsers', (data) => {
      dispatch(updateActiveUsers(data));
      setActiveUsers(data);
    });
  }, [user]);

  useEffect(() => {
    socket.on('serverMessages', (data) => {
      dispatch(setServerMessages(data));
    });
  }, []);

  return (
    <section className='join_chat_container w-10/12 mx-auto h-fit min-h-[50vh] flex flex-col items-center m-auto justify-evenly my-12 gap-8'>
      <div className='user_info_container flex flex-col gap-8 justify-evenly'>
        <div className='user_info_avatar_container flex flex-col gap-6 items-center justify-center'>
          <span className='bg-slate-200 p-4 rounded-[50%]  shadow-lg'>
            <img
              alt='User avatar'
              className='user_info_avatar rounded-[50%] w-full max-w-[5rem]'
              src={defaultPhoto}
            />
          </span>
          <p className='text-[2rem]'>User Demo</p>
        </div>
        <div className='user_info_description flex justify-center'>
          <h3 className='info_description_heading text-[3rem] font-black screen-mid:text-[2.4rem]'>
            Engage with other buyers and merchants in real-time.
          </h3>
        </div>
        <div className='user_info_active w-full flex flex-col items-center gap-6'>
          <h4 className='users_active_heading text-[2rem] font-extrabold screen-mid:text-[1.8rem]'>
            More than {activeUsers.length <= 0 ? '...' : activeUsers.length}{' '}
            people are online, and ready to{' '}
            <span className='text-primary font-black text-[2rem] uppercase'>
              chat!
            </span>
          </h4>
          <div className='users_active_avatars flex items-center flex-wrap'>
            {activeUsers.map((_, i) => {
              return (
                <div
                  key={i}
                  className='p-1 rounded-[50%] flex cursor-pointer gap-0 translate-x-1 w-fit mr-[-1.2rem] bg-slate-300 overflow-hidden shadow-md'
                  style={{
                    overflowClipMargin: 'content-box',
                    overflow: 'clip',
                    border: '2px solid white'
                  }}
                >
                  <img
                    alt='User active avatar'
                    className='rounded-[50%] w-full max-w-[2rem]'
                    src={defaultPhoto}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='join_chat_cta w-full flex flex-col items-center'>
        <Button
          value='Join in'
          className='primary-btn normal-case py-4 px-8 w-[1/4] rounded-[2rem]'
          route='/chat/room'
          onClick={() => {
            socket.emit('userLogin', user);
          }}
        />
      </div>
    </section>
  );
};

export default JoinChat;
