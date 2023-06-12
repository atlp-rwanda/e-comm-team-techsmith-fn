import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AuthBlueSide from '../components/AuthBlueSide';
import TLogo from '../assets/images/T_Logo.png';
import Loading from '../components/Loading';
import { reset, resetPassword } from '../states/features/auth/authSlice';

const ResetPasswordContainer = () => {
  const [incorrectCred, setIncorrectCred] = useState(null);

  const { token } = useParams();
  const RealToken= token.replace(/-/g, '.');
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { isLoading,isError,isSuccess, message } = useSelector((state) => {
    return state.auth;
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const passwordInput = e.target.elements.password.value;
    const confirmPasswordInput = e.target.elements.confirmPassword.value;
 

    if (passwordInput.length < 8) {
      setIncorrectCred('Password must be at least 8 characters long.');
      return;
    }

    if (passwordInput !== confirmPasswordInput) {
      setIncorrectCred('Passwords do not match.');
      return;
    }
    dispatch(resetPassword({  token: RealToken, password: passwordInput }));
   setOpen(true);
  
  };
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
    <div className='loginPage'>
      <div>
        <div className='loginPage__mobileHeader'>
          <div className='loginPage__imgHeader'>
            <img src={TLogo} alt='#' />
          </div>
          <div className='loginPage__signInHeader'>
            <button type='button' className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded'>
              Sign up
            </button>
          </div>
        </div>
        <div className='loginPage__title'>
          <h4 className='text-xl'>RESET PASSWORD</h4>
        </div>

          {message && (
            <Snackbar
              open={open}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              autoHideDuration={8000}
              onClose={handleClose}
            >
              <Alert
              variant="standard"
              severity={message.includes('error') ? 'error' : 'success'}
              style={{ fontSize: '20px', color: message.includes('error') ? 'red' : 'green', padding: '6px 8px' }}
            >
                {message}
              </Alert>
            </Snackbar>
          )}
        <div className='loginPage__form'>
          <form onSubmit={onSubmit} noValidate>
            <div className='loginPage__input'>
            <input
            type='password'
            id='password'
            name='password'
            placeholder='New Password'
            className='text-xl'
            required
          />

            </div>
            <div className='loginPage__input'>
            <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            name='confirmPassword'
            className='text-xl'
            required
          />

  {incorrectCred && <p className='loginPage__error'>{incorrectCred}</p>}
</div>

            <div className='loginPage__button'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 border border-blue-200 rounded'
              >
                {isLoading ? <Loading /> : 'SUBMIT'}
              </button>
            </div>
          </form>
        </div>


      </div>
      <AuthBlueSide button='SIGN UP' heading='Create Your Account' />
    </div>
  );
};

export default ResetPasswordContainer;
