import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { defaultPhoto } from '../../constants';

const Participants = forwardRef(({ active, users }, ref) => {
  return (
    <div
      ref={ref}
      className='participants_container w-full flex flex-col items-center gap-8 px-4'
    >
      <div className='participants_room w-full flex flex-col gap-4 my-6 screen-base:items-center'>
        <h3 className='text-[2.2rem] flex items-center gap-4 font-bold mid:text-[1.8rem] screen-base:text-[1.8rem]'>
          <span className='w-fit p-4 bg-green-600 rounded-[50%] shadow-md screen-mid:p-2' />
          Active Users
        </h3>
        <ul className='participants_room_list w-full flex flex-col items-start gap-6 screen-base:flex-row overflow-scroll p-2'>
          {users.map((_, i) => {
            const { user, room } = _;
            return (
              <li
                key={i}
                className='participant_room_item w-full h-full max-h-[5rem] flex items-center gap-2 text-[1.6rem]'
              >
                <ActiveUser active={active} user={user} room={room} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

const ActiveUser = forwardRef(({ active, user, room }, ref) => {
  return (
    <>
      <span className='flex items-center shadow-lg rounded-[50%] p-2'>
        <img
          src={defaultPhoto}
          alt='Active user avatar'
          className='w-full max-w-[3rem] screen-base:max-w-[2rem]'
        />
        <span className='h-full flex flex-col items-center justify-end drop-shadow-lg'>
          <span
            ref={ref}
            className={`w-fit p-2 h-fit flex ${
              active ? 'bg-green-500' : 'bg-[#9ca3af]'
            } rounded-[50%] mb-[-1.5rem] ml-[-1rem]`}
          />
        </span>
      </span>
      <span className='flex flex-col justify-between items-start'>
        <h4 className='font-medium text-[1.5rem] text-start screen-base:text-[1rem]'>
          {user.name}
        </h4>
        <p className='font-light text-[1rem] screen-base:hidden'>{room}</p>
      </span>
    </>
  );
});

ActiveUser.propTypes = {
  active: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  room: PropTypes.string.isRequired
};

Participants.propTypes = {
  active: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Participants;
