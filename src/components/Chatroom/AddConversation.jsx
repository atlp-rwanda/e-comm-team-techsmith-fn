import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import {
  searchRoom,
  setConversationModal,
  setRoomParticipants,
  setSearchResults,
  user
} from '../../states/features/chat/chatSlice';
import { socket } from '../../socket';
import Pagination from '../Pagination';
import { usePostCreateRoomWithParticipantMutation } from '../../states/api/apiSlice';
import Loading from '../Loading';

const AddConversation = ({ show }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => {
    return state.chat;
  });

  const { page, size } = useSelector((state) => {
    return state.pagination;
  });

  const [postCreateRoomWithParticipant, {
    data: roomParticipantData,
    isLoading: roomParticipantLoading,
    isSuccess: roomParticipantSuccess,
    isError: roomParticipantError,
  }] = usePostCreateRoomWithParticipantMutation();

  const onSubmit = (data) => {
    const searchData = {
      name: data.search_room,
      page,
      size,
    }
    dispatch(searchRoom(searchData));
  };

  useEffect(() => {
    socket.on('searchResults', (data) => {
      dispatch(setSearchResults(data));
    });
  }, []);

  useEffect(() => {
    if (roomParticipantSuccess) {
      dispatch(setRoomParticipants(roomParticipantData.data));
      dispatch(setConversationModal(false));
    }
  }, [roomParticipantData, roomParticipantSuccess, roomParticipantError]);


  return (
    <main
      className={`${
        show ? 'flex' : 'hidden'
      } items-start absolute min-h-[50vh] h-full w-[100%] px-8 py-12 shadow-lg rounded-md bg-white z-50 flex-col justify-start gap-8`}
    >
      <form
        className='search_form flex items-center w-full gap-6'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='search_room'
          render={({ field }) => {
            return (
              <Input
                value={field.value}
                placeholder='Search a user'
                {...field}
              />
            );
          }}
        />
        <Controller
          name='submit'
          control={control}
          render={({ field }) => {
            return (
              <Button
                input
                className='w-fit h-fit p-0 px-0 py-0 rounded-[50%]'
                value={
                  <FontAwesomeIcon
                    className='text-white w-8 bg-primary p-4 rounded-[50%] cursor-pointer ease-in-out duration-150 hover:scale-95'
                    icon={faSearch}
                    {...field}
                  />
                }
              />
            );
          }}
        />
      </form>
      {roomParticipantLoading ? (
        <div className='w-full flex flex-col items-center justify-center h-full gap-6'>
          <Loading size={50} />
          <h4 className='font-medium text-[1.6rem] text-center'>Starting a conversation...</h4>
        </div>
      ): (
        <ul className='search_results w-full flex flex-col items-start gap-4'>
        {searchResults?.users?.length > 0 &&
          searchResults?.users?.map((result) => {
            return (
              <li
                className='search_result flex items-center justify-between gap-4 w-full cursor-pointer'
                key={result.id}
              >
                <Button
                  value={`${result.name} ${result?.group ? '(Group)' : '(User)'}`}
                  className='w-full rounded-md bg-white py-4 px-6 shadow-md hover:bg-primary hover:text-white hover:shadow-lg transition-all ease-in-out'
                  onClick={(e) => {
                    e.preventDefault();
                    const roomName = `${result?.group ? `${result.name}` : ''}`
                    postCreateRoomWithParticipant({
                      roomName,
                      creatorId: user.id,
                      recipientId: result.id,
                    })
                  }}
                />
              </li>
            );
          })}
      </ul>
      )}
      <Pagination
        className='w-full flex gap-4 items-center justify-center'
        totalPages={searchResults.totalPages}
        pageOptions={[3, 4]}
      />
      <article className='absolute bottom-8 w-full flex items-center justify-center'>
        <Button
          className='primary-btn w-fit p-4 rounded-[50%]'
          value={<FontAwesomeIcon icon={faX} />}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setConversationModal(false));
          }}
        />
      </article>
    </main>
  );
};

AddConversation.propTypes = {
  show: PropTypes.bool
};

AddConversation.defaultProps = {
  show: false
};

export default AddConversation;
