import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faUserPlus,
  faUsersLine,
  faX
} from '@fortawesome/free-solid-svg-icons';
import { useLazyGetRoomListQuery } from '../../states/api/apiSlice';
import Loading from '../Loading';
import Button from '../Button';
import {
  setCreateConversationOptions,
  setCreateGoupModal,
  setCreateUserModal,
  setRoomId,
  setRooms,
  user
} from '../../states/features/chat/chatSlice';
import { socket } from '../../socket';
import CreateUser from './CreateUser';
import Pagination from '../Pagination';
import CreateGroup from './CreateGroup';

const Rooms = () => {
  const [
    getRoomsList,
    {
      data: roomsData,
      isLoading: roomsLoading,
      isSuccess: roomsSuccess,
      isError: roomsError
    }
  ] = useLazyGetRoomListQuery();

  const dispatch = useDispatch();

  const {
    rooms,
    roomId,
    createUserModal,
    createGroupModal,
    createConversationOptions
  } = useSelector((state) => {
    return state.chat;
  });

  const { page, size } = useSelector((state) => {
    return state.pagination;
  });

  useEffect(() => {
    const roomSize = size > 4 ? size : 4;
    getRoomsList({ userId: user?.id, page, size: roomSize });
  }, []);

  useEffect(() => {
    const roomSize = size > 4 ? size : 4;
    getRoomsList({ userId: user?.id, page, size: roomSize });
  }, [rooms, roomId, page, size]);

  useEffect(() => {
    if (roomsSuccess) {
      dispatch(setRooms(roomsData.data.rows));
    }
  }, [roomsData, roomsSuccess]);

  if (roomsError)
    return (
      <article className='w-full flex items-center h-full justify-evenly'>
        <h1 className='text-xl font-bold text-red-500 text-center'>
          Could not load conversations
        </h1>
      </article>
    );

  return (
    <div className='participants_container relative w-full flex flex-col h-[90%] items-center justify-between gap-8 px-0 screen-mid:hidden'>
      <CreateUser show={createUserModal} />
      <CreateGroup show={createGroupModal} />
      <section
        className='participants_room h-full min-h-[30vh] flex flex-col gap-4 my-6 w-[95%] mx-auto'
        onClick={(e) => {
          e.preventDefault();
          dispatch(setCreateUserModal(false));
        }}
      >
        {!roomsLoading && rooms.length === 0 && (
          <div className='flex items-center justify-center h-full w-full flex-col gap-6'>
            <h1 className='text-[2rem] text-primary font-bold text-bluewish text-center'>
              No conversations found
            </h1>
            <Button
              value={
                <FontAwesomeIcon
                  icon={createConversationOptions ? faX : faAdd}
                />
              }
              className='primary-btn w-fit p-4 rounded-[50%] ml-4'
              onClick={(e) => {
                e.preventDefault();
                dispatch(
                  setCreateConversationOptions(!createConversationOptions)
                );
              }}
            />
          </div>
        )}
        {roomsLoading ? (
          <Loading width={50} />
        ) : (
          <ul className='participants_room_list flex flex-col gap-2 items-start'>
            {rooms.map((room, i) => {
              return (
                <li
                  key={i}
                  className={`${
                    roomId === room.id ? 'bg-primary text-white' : 'bg-white'
                  } flex items-center justify-start pxx-8 w-full bg-white rounded-md text-black text-[1.5rem] hover:bg-bluewishGray hover:text-white`}
                >
                  <Button
                    value={`${room.name} ${room.group ? '(Group)' : ''}`}
                    onClick={() => {
                      dispatch(setRoomId(room.id));
                      socket.emit('getChat', room.id);
                    }}
                    className={`${
                      roomId === room.id ? 'bg-primary text-white' : 'bg-white'
                    } h-full min-h-[6rem] px-8 flex items-center justify-start w-full rounded-sm text-black text-[1.5rem] hover:bg-bluewishGray hover:text-white`}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>
      <Pagination
        totalPages={1 || roomsData.data.totalPages}
        pageOptions={[4, 5]}
        className='flex items-center justify-center gap-4 mb-24'
      />
      <article className='floating_button absolute right-8 bottom-[-.5rem] flex flex-col items-center gap-4'>
        <ul
          className={`${
            createConversationOptions ? 'flex' : 'hidden'
          } create_conversation ease-in-out duration-300 flex flex-col gap-4 shadow-lg bg-white`}
        >
          <li>
            <Button
              value={<FontAwesomeIcon icon={faUserPlus} />}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setCreateUserModal(true));
              }}
            />
          </li>
          <li>
            <Button
              value={<FontAwesomeIcon icon={faUsersLine} />}
              onClick={(e) => {
                e.preventDefault();
                dispatch(setCreateGoupModal(true));
              }}
            />
          </li>
        </ul>
        <Button
          value={
            <FontAwesomeIcon icon={createConversationOptions ? faX : faAdd} />
          }
          className='primary-btn w-fit p-4 rounded-[50%]'
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCreateConversationOptions(!createConversationOptions));
          }}
        />
      </article>
    </div>
  );
};

export default Rooms;
