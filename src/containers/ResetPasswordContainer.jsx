import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import AuthBlueSide from '../components/AuthBlueSide';
import TLogo from '../assets/images/T_Logo.png';
import Loading from '../components/Loading';
import { reset, resetPassword } from '../states/features/auth/authSlice';

import {
  ErrorNotification,
  successNotification
} from '../components/Notification';

const ResetPasswordContainer = () => {
  const { token } = useParams();
  const RealToken = token.replace(/-/g, '.');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { isLoading, isError, isSuccess, message } = useSelector((state) => {
    return state.auth;
  });

  const onSubmit = (data) => {
    const { password, confirmPassword } = data;

    if (password.length < 8) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    dispatch(resetPassword({ token: RealToken, password }));
  };

  useEffect(() => {
    if (isSuccess) {
      successNotification(message.message);
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
    <div className='loginPage'>
      <div className='flex justify-center items-center'>
        <div className='loginPage__parent'>
          <div className='loginPage__mobileHeader'>
            <div className='loginPage__imgHeader'>
              <img src={TLogo} alt='#' />
            </div>
            <div className='loginPage__signInHeader'>
              <button
                type='button'
                className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded'
              >
                Sign up
              </button>
            </div>
          </div>
          <div className='loginPage__title'>
            <h4 className='text-xl'>RESET PASSWORD</h4>
          </div>

          <div className='loginPage__form'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className='loginPage__input'>
                <input
                  type='password'
                  id='password'
                  {...register('password', { required: true, minLength: 8 })}
                  placeholder=''
                  className='text-xl'
                />
                <label htmlFor='new-password'>New Password</label>
                {errors.password && (
                  <p className='loginPage__error'>
                    Password must be at least 8 characters long.
                  </p>
                )}
              </div>
              <div className='loginPage__input'>
                <input
                  type='password'
                  id='confirmPassword'
                  {...register('confirmPassword', { required: true })}
                  placeholder=''
                  className='text-xl'
                />
                <label htmlFor='confirm-password'>Confirm Password</label>
                {errors.confirmPassword && (
                  <p className='loginPage__error'>Passwords do not match.</p>
                )}
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
            {isSuccess && <ToastContainer />}
            {isError && <ToastContainer />}
          </div>
        </div>
      </div>
      <AuthBlueSide
        button='SIGN UP'
        onClick={() => {
          navigate('/signup');
        }}
        heading='Create Your Account'
      />
    </div>
  );
};

export default ResetPasswordContainer;
