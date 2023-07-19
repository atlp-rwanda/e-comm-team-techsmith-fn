import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useLazyGetRoomListQuery } from '../../states/api/apiSlice';
import Loading from '../Loading';
import Button from '../Button';
import { setConversationModal, setRoomId, setRooms, user } from '../../states/features/chat/chatSlice';
import { socket } from '../../socket';
import AddConversation from './AddConversation';
import Pagination from '../Pagination';

const Rooms = () => {
  const [
    getRoomsList,
    {
      data: roomsData,
      isLoading: roomsLoading,
      isSuccess: roomsSuccess,
      isError: roomsError,
    }
  ] = useLazyGetRoomListQuery();

  const dispatch = useDispatch();

  const { rooms, roomId, conversationModal } = useSelector((state) => {
    return state.chat;
  });

  const { page, size } = useSelector((state) => {
    return state.pagination;
  });

  useEffect(() => {
    getRoomsList({userId: user?.id, page, size});
  }, []);

  useEffect(() => {
    getRoomsList({ userId: user?.id, page, size });
  }, [rooms, roomId, page, size]);

  useEffect(() => {
    if (roomsSuccess) {
      dispatch(setRooms(roomsData.data.rows));
    }
  }, [roomsData, roomsSuccess]);


  if (roomsError)
    return (
      <article className='w-full flex items-center justify-evenly'>
        <h1 className='text-xl font-bold text-red-500'>Could not load rooms</h1>
      </article>
    );

  return (
    <div className='participants_container relative w-full flex flex-col h-[90%] items-center justify-between gap-8 px-0 screen-mid:hidden'>
      <AddConversation show={conversationModal} />
      <section
        className='participants_room flex flex-col gap-4 my-6 w-[95%] mx-auto'
        onClick={(e) => {
          e.preventDefault();
          dispatch(setConversationModal(false));
        }}
      >
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
        totalPages={2 || roomsData.data.totalPages}
        pageOptions={[3, 4]}
        className='flex items-center justify-center gap-4 mb-24'
      />
      <article className='floating_button absolute right-8 bottom-6'>
        <Button
          value={<FontAwesomeIcon icon={faAdd} />}
          className='primary-btn w-fit p-4 rounded-[50%]'
          onClick={(e) => {
            e.preventDefault();
            dispatch(setConversationModal(true));
          }}
        />
      </article>
    </div>
  );
};

export default Rooms;
