import React from 'react';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { lock, unlock } from '../assets';
import { successNotification } from '../components/Notification';
import { disableUser, enableUser } from '../states/features/users/usersSlice';
import Loading from '../components/Loading';
import { usePutUserRoleMutation } from '../states/api/apiSlice';

export const Userlist = ({ userList }) => {
  const dispatch = useDispatch();
  const { isLoading, accountStatus, message } = useSelector((state) => {
    return state.users;
  });

  const [putUserRole, { isSuccess, isLoading: loading }] =
    usePutUserRoleMutation();

  const blockUnblockUser = (e) => {
    if (accountStatus) {
      dispatch(disableUser(e.target.id));
      successNotification('Account disabled!');
      e.target.src = lock;
    } else {
      e.target.src = unlock;
      dispatch(enableUser(e.target.id));
      successNotification('Account enabled!');
    }
  };
  return (
    <div>
      {message && <ToastContainer />}
      {isLoading && <Loading />}
      {userList?.map((user) => {
        return (
          <div
            key={user.email}
            className='w-full p-0 pl-10  theUser grid gap-0  '
          >
            <span id='username' className='username flex max-w-[300px] '>
              <p>{user.name}</p>
            </span>
            <span className='useremail flex text-ellipsis overflow-hidden ... max-w-[180px] '>
              <p>{user.email}</p>
            </span>
            <span
              id='date'
              className=' userdate flex max-w-[24rem] overflow-hidden'
            >
              <p>{moment(user.createdAt).format('YYYY-MM-DD hh:mm:ss')}</p>
            </span>
            <span className='userrole flex justify-center  '>
              {isSuccess}
              <select
                onChange={(e) => {
                  const roleId = e.target.value;
                  const { id } = user;
                  putUserRole({ id, roleId });
                }}
                id={user.id}
                disabled={loading}
                className={
                  loading
                    ? 'bg-red-50 border border-red-300'
                    : 'bg-green-50 border border-green-300'
                }
              >
                <option value='' selected disabled hidden>
                  {' '}
                  {loading ? 'Loading...' : user.role.name}
                </option>
                <option value={1}>
                  <p>Admin</p>
                </option>
                <option value={2}>
                  <p>Seller</p>
                </option>
                <option value={3}>
                  <p>Buyer</p>
                </option>
              </select>
            </span>

            <button className='image-button flex justify-center ' type='button'>
              {user.isActive === false ? (
                <img
                  className='w-[20px]'
                  id={user.id}
                  src={lock}
                  onClick={blockUnblockUser}
                  alt=''
                />
              ) : (
                <img
                  className='w-[20px]'
                  id={user.id}
                  src={unlock}
                  onClick={blockUnblockUser}
                  alt=''
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

Userlist.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.object)
};
