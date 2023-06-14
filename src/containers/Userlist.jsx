import React, { useState } from 'react';
import { Select, MenuItem, Alert,Snackbar} from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defaultProfilePic, lock, unlock } from '../assets';
import {
  disableUser,
  enableUser,
} from '../states/features/users/usersSlice';
import Loading from '../components/Loading';

export const Userlist = ({ userList }) => {
  const dispatch = useDispatch();
  const { isLoading, accountStatus, message } = useSelector((state) => {
    return state.users;
  });
  const [open, setOpen] = useState(false);
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [role, setrole] = useState(2);
  
  const handleChange = (event) => {
    setrole(event.target.value);
  };

  const blockUnblockUser = (e) => {
    if (accountStatus) {
      dispatch(disableUser(e.target.id));
      e.target.src = lock;
    } else {
      e.target.src = unlock;
      dispatch(enableUser(e.target.id));
    }
  };
  return (
    <div>
      {message && (
                <Snackbar
                open={open}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                autoHideDuration={9000}
                onClose={handleClose}
              >
                <Alert
                  variant='standard'
                  severity='error'
                  style={{ fontSize: '20px', padding: '6px 8px' }}
                >
                  {message}
                </Alert>
              </Snackbar>
      )}
      {isLoading && <Loading />}
      {userList?.map((user) => {return (
        <div
          key={user.email}
          className='w-full p-0 pl-10  theUser grid gap-0  '
        >
          <span className='userprofile flex justify-center max-w-[150px]'>
            <img src={defaultProfilePic} alt='' />
          </span>
          <span id='username' className='username flex max-w-[150px] '>
            <p>{user.name}</p>
          </span>
          <span className='useremail flex text-ellipsis overflow-hidden ... max-w-[180px] '>
            <p>{user.email}</p>
          </span>
          <span
            id='date'
            className=' userdate flex  max-w-[24rem] overflow-hidden ... max-w-[180px] '
          >
            <p>{user.createdAt}</p>
          </span>
          <span className='userrole flex justify-center  '>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={role}
              className='select'
              onChange={handleChange}
              sx={{ color: 'white' }}
            >
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Buyer</MenuItem>
              <MenuItem value={3}>Seller</MenuItem>
            </Select>
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
      )})}
    </div>
  );
};

Userlist.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.object)
};