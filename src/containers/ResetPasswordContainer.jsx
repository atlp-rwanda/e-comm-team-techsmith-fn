import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import AuthBlueSide from '../components/AuthBlueSide';
import TLogo from '../assets/images/T_Logo.png';
import Loading from '../components/Loading';
import {
  resetPassword,
  changePasssword
} from '../states/features/auth/authSlice';

import {
  ErrorNotification,
  successNotification
} from '../components/Notification';

const ResetPasswordContainer = () => {
  const { token } = useParams();
  const RealToken = token.replace(/-/g, '.');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [securityChange, setChangePassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { isLoading, isError, isSuccessPassword, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );
  useEffect(() => {
    if (localStorage.getItem('changePassword')) {
      setChangePassword(true);
    }
    if (isSuccessPassword) {
      successNotification(message);
      localStorage.removeItem('changePassword');
      navigate('/login');
    } else if (isError) {
      ErrorNotification(message);
    }
  }, [isSuccessPassword, isError]);

  const onSubmit = (data) => {
    const { password, confirmPassword } = data;

    if (password.length < 8) {
      return ErrorNotification('Password must be at least 8 characters');
    }

    if (password !== confirmPassword) {
      return ErrorNotification("Password doesn't match");
    }

    return dispatch(resetPassword({ password, token: RealToken }));
  };
  const onSubmit2 = (data) => {
    const email = localStorage.getItem('email');
    const { password, confirmPassword, OldPassword } = data;

    if (password.length < 8) {
      return ErrorNotification('Password must be at least 8 characters');
    }
    if (password !== confirmPassword) {
      return ErrorNotification("Password doesn't match");
    }

    return dispatch(
      changePasssword({
        email,
        newPassword: password,
        confPassword: confirmPassword,
        oldPassword: OldPassword
      })
    );
  };

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
            {securityChange ? (
              <h4 className='text-xl'>CHANGE PASSWORD</h4>
            ) : (
              <h4 className='text-xl'>RESET PASSWORD</h4>
            )}
          </div>

          <div className='loginPage__form'>
            <form
              onSubmit={handleSubmit(securityChange ? onSubmit2 : onSubmit)}
              noValidate
            >
              {securityChange && (
                <div className='loginPage__input'>
                  <input
                    type='password'
                    id='Oldpassword'
                    {...register('OldPassword', {
                      required: true,
                      minLength: 8
                    })}
                    placeholder=''
                    className='text-xl'
                  />
                  <label htmlFor='new-password'>Old Password</label>
                  {errors.password && (
                    <p className='loginPage__error'>
                      Password must be at least 8 characters long.
                    </p>
                  )}
                </div>
              )}
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
            {isSuccessPassword && <ToastContainer />}
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
