import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { faAdd, faSearch, faX } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import Input from '../Input';
import Button from '../Button';
import { searchRoom, setCreateGoupModal, setCreateNewGroupModal, setGroupUsers, setGroupsList, setRoomId, setSearchRoomResults, user } from '../../states/features/chat/chatSlice';
import { useLazyGetGroupsListQuery, useCreateParticipantMutation, useCreateGroupMutation } from '../../states/api/apiSlice';
import Loading from '../Loading';
import { socket } from '../../socket';
import Pagination from '../Pagination';

const CreateGroup = ({ show = true }) => {
  const { control, handleSubmit } = useForm();

  const dispatch = useDispatch();

  const { page, size } = useSelector((state) => {
    return state.pagination;
  });

  const { createGroupModal, groups } = useSelector((state) => {
    return state.chat;
  });

  const [
    getGroupsList,
    { data: groupsData, isLoading: groupsLoading, isSuccess: groupsSuccess }
  ] = useLazyGetGroupsListQuery();

  const [createParticipant, {
    data: participantData,
    isLoading: participantLoading,
    isSuccess: participantSuccess,
    isError: participantError,
  }] = useCreateParticipantMutation();

  useEffect(() => {
    if (createGroupModal) {
      getGroupsList({ page, size });
    }
    if (groupsSuccess) {
      dispatch(setGroupsList(groupsData.data.rows));
    }
  }, [createGroupModal, groupsData, groupsSuccess]);

  useEffect(() => {
    if (groupsSuccess) {
      getGroupsList({ page, size });
      dispatch(setGroupsList(groupsData.data.rows));
    }
  }, [page, size]);

  useEffect(() => {
    if (participantSuccess) {
      dispatch(setCreateGoupModal(false));
      dispatch(setRoomId(participantData.data?.roomId));
    }
  }, [participantData, participantSuccess]);

  const onSubmit = (data) => {
    const payload = {
        name: data.search_room,
        page,
        size,
    };
    socket.emit('searchGroups', payload);
  };

  useEffect(() => {
    socket.on('searchGroupsResults', (data) => {
      dispatch(setGroupsList(data));
    });
  }, []);

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
                placeholder='Search a group'
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
      {groupsLoading ? (
        <div className='w-full flex flex-col items-center justify-center h-full gap-6'>
          <Loading size={50} />
        </div>
      ) : (
        <ul className='w-full flex flex-col items-start gap-4'>
          {groups?.map((group, i) => {
            return (
              <li key={i} className='w-full'>
                <Button
                  value={group?.name}
                  className='w-full rounded-md bg-white py-4 px-6 shadow-md hover:bg-primary hover:text-white hover:shadow-lg transition-all ease-in-out'
                  onClick={(e) => {
                    e.preventDefault();
                    createParticipant({
                        userId: user?.id,
                        roomId: group?.id,
                    })
                  }}
                />
              </li>
            );
          })}
          <li className='w-full flex items-center justify-center'>
            <Button value={
                <FontAwesomeIcon icon={faAdd} />
            } className='primary-btn w-fit p-4 normal-case'
            onClick={(e) => {
              e.preventDefault();
              dispatch(setCreateNewGroupModal(true));
              dispatch(setCreateGoupModal(false));
            }}
            />
          </li>
        </ul>
      )}
      <article className='absolute bottom-8 w-full flex items-center justify-center'>
        <Button
          className='primary-btn w-fit p-4 rounded-[50%]'
          value={<FontAwesomeIcon icon={faX} />}
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCreateGoupModal(false));
          }}
        />
      </article>
    </main>
  );
};

export const CreateNewGroup = ({ show = false }) => {
  const { control, handleSubmit } = useForm();

  const { searchResults, groupUsers } = useSelector((state) => {
    return state.chat;
  });

  const { page, size } = useSelector((state) => {
    return state.pagination;
  });

  const [createGroup, {
    data: createGroupData,
    isLoading: createGroupLoading,
    isSuccess: createGroupSuccess,
  }] = useCreateGroupMutation();

  const dispatch = useDispatch();

  const searchSubmit = (data) => {
    const searchData = {
      name: data.search_user,
      page,
      size,
    }
    dispatch(searchRoom(searchData));
  };

  const createNewGroup = (data) => {
    const participants = groupUsers.map((groupUser) => {
      return groupUser.id;
    });

    createGroup({
      name: data.group_name,
      participants,
    })
  }

  useEffect(() => {
    socket.on('searchUsersResults', (data) => {
      dispatch(setSearchRoomResults(data));
    });
  }, []);

  useEffect(() => {
    if (createGroupSuccess) {
      dispatch(setCreateNewGroupModal(false));
      dispatch(setGroupUsers([]));
      dispatch(setRoomId(createGroupData.data?.group?.id));
    }
  }, [createGroupData, createGroupSuccess]);

  return (
    <main
      className={`${
        show ? 'flex' : 'hidden'
      } absolute w-[90%] flex-col items-center gap-8 mx-auto min-h-[65vh] p-8 shadow-lg rounded-e-md bg-white z-50`}
    >
      <article className='absolute top-6 right-8'>
        <Button
          value={<FontAwesomeIcon icon={faX} className='w-6 h-6' />}
          className='primary-btn w-fit p-4 rounded-[50%]'
          onClick={(e) => {
            e.preventDefault();
            dispatch(setCreateNewGroupModal(false));
          }}
        />
      </article>
      <h3 className='text-primary text-[2rem] text-center'>Create new group</h3>
      <article className='w-full flex items-start gap-12 px-8'>
        <section className='w-full flex flex-col gap-6'>
          <form
            onSubmit={handleSubmit(searchSubmit)}
            className='search_form flex items-center w-full gap-6 max-w-[80%]'
          >
            <Controller
              name='search_user'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    placeholder='Search users to add'
                    {...field}
                    value={field.value}
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
                        className='text-white w-6 h-6 bg-primary p-4 rounded-[50%] cursor-pointer ease-in-out duration-150 hover:scale-95'
                        icon={faSearch}
                        {...field}
                      />
                    }
                  />
                );
              }}
            />
          </form>
          <ul className='search_results w-full max-w-[80%] flex flex-col items-start gap-4'>
            {searchResults?.users?.length > 0 &&
              searchResults?.users?.map((result) => {
                return (
                  <li
                    className='search_result flex items-center justify-between gap-4 w-full cursor-pointer'
                    key={result.id}
                  >
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(setGroupUsers(result));
                      }}
                      value={<span className='flex items-center gap-4'>
                        <p className='w-full text-[1.5rem]'>{result.name}</p>
                        <FontAwesomeIcon icon={faAdd} className='w-6 h-6 bg-primary p-4 rounded-[50%] ease-in-out duration-300 text-white hover:scale-105' />
                      </span>}
                      className='w-full rounded-md bg-white py-4 px-6 shadow-md hover:shadow-lg transition-all ease-in-out'
                    />
                  </li>
                );
              })}
          </ul>
          <Pagination
            className='w-full flex gap-4 items-center justify-start'
            totalPages={searchResults.totalPages}
            pageOptions={[3, 4]}
          />
        </section>
        <section className='w-full flex flex-col gap-6'>
          <form className=' w-full max-w-[80%] flex flex-col gap-6' onSubmit={handleSubmit(createNewGroup)}>
            <Controller
              name='group_name'
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    value={field.value}
                    placeholder='Group name'
                  />
                );
              }}
            />
            {createGroupLoading ? (
              <div className='w-full flex items-center justify-center h-full min-h-[70%] gap-6'>
                <Loading size={50} />
              </div>
            ) : (
              <ul className='flex flex-col w-full min-h-[70%] items-start gap-4'>
              {groupUsers.map((element, index) => {
                return (
                  <li key={index} className='w-full rounded-md bg-white text-[1.5rem] py-4 px-6 shadow-md hover:cursor-pointer hover:shadow-lg transition-all ease-in-out'>
                    {element.name}
                  </li>
                );
              })}
            </ul>
            )}
            <Button
              value='Create'
              input
              className='primary-btn w-fit normal-case py-4 px-6 mx-auto text-[1.5rem]'
            />
          </form>
        </section>
      </article>
    </main>
  );
};

CreateGroup.propTypes = {
  show: PropTypes.bool
};

CreateNewGroup.propTypes = {
    show: PropTypes.bool
};

export default CreateGroup;
