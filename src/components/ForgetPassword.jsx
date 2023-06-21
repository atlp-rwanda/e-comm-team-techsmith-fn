import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Loading from './Loading';
import { requestPasswordReset, reset } from '../states/features/auth/authSlice';

import { ErrorNotification, successNotification } from './Notification';

const ForgetPassword = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => {
    return state.auth;
  });

  const onSubmit = (data) => {
    dispatch(requestPasswordReset(data.email));
  };

  useEffect(() => {
    if (isSuccess) {
      successNotification(message);

      navigate('/login');
    } else if (isError) {
      ErrorNotification(message);
    }
    if (isSuccess || isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    }
  }, [isSuccess, isError, dispatch, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
      {isSuccess && <ToastContainer />}
      {isError && <ToastContainer />}
      <Typography variant='h4' sx={{ fontSize: 'x-large' }}>
        Forgot Your Password?
      </Typography>
      <p>
        Please enter your email address below and click Reset to reset your
        password.
      </p>
      <div className='relative'>
        <input
          placeholder=''
          name='email'
          id='email'
          type='email'
          {...register('email', {
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email'
            },
            required: 'Email is required'
          })}
          className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
          required
        />
        <label
          htmlFor='floating_outlined'
          className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'
        >
          Email
        </label>
      </div>

      <button
        type='submit'
        className='bg-primary hover:bg-primary-dark text-white font-medium py-3 px-8 rounded-lg text-lg'
        disabled={isLoading}
      >
        {isLoading ? <Loading /> : 'RESET'}
      </button>
    </form>
  );
};

export default ForgetPassword;
