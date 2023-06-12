import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {  Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import { requestPasswordReset,reset } from '../states/features/auth/authSlice';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  
  const { register, handleSubmit, } = useForm();
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const dispatch = useDispatch();
  const { isLoading,isError,isSuccess, message } = useSelector((state) => {
    return state.auth;
  });

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

const onSubmit = () => {
  if (!email) {
    message('Please enter your email address.');
  } else {
    dispatch(requestPasswordReset(email))
   setOpen(true);

  }
};

useEffect(() => {

  if (isSuccess || isError) {
    setTimeout(() => {
      dispatch(reset());
      navigate('/login');
    }, 5000); // Delay of 2000 milliseconds (5 seconds)
  }
}, [dispatch, isSuccess]);

  return (

    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
      <h4 className='text-2xl font-bold'>Forgot Your Password?</h4>
      <p>Please enter your email address below and click Reset to reset your password.</p>
      
      <input
        placeholder='Email'
        value={email}
        name='email'
        id='email'
        type='email'
        {...register('email', {
          pattern: {
            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Invalid email',
          },
          required: 'Email is required',
        })}
        onChange={handleEmailChange}
        className='border border-gray-300 font-medium py-3 px-4 rounded-md focus:outline-none'
        required
      />
      {isSuccess && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          autoHideDuration={8000}
          onClose={handleClose}
        >
          <Alert
            variant='standard'
            severity='success'
            style={{ fontSize: '20px', padding: '6px 8px' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {isError && (
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
      )
    }  
       
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
