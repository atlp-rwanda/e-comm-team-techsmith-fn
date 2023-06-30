import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Google from '../assets/images/google.png';
import AuthBlueSide from '../components/AuthBlueSide';
import TLogo from '../assets/images/T_Logo.png';
import Loading from '../components/Loading';
import InputPopup from '../components/InputPopup';
import PopupMaker from '../components/PopupMaker';
import ForgetPassword from '../components/ForgetPassword';
import { login } from '../states/features/auth/authSlice';
import { GOOGLE_AUTH_URL } from '../constants';
import { ChangePassword } from '../components/changePassword';
// import { ChangePassword } from '../components/changePassword';

const LoginContainer = () => {
  const form = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { isLoading, isError, isSuccess, changePassword } = useSelector(
    (state) => {
      return state.auth;
    }
  );
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const mySubmit = async (data) => {
    localStorage.setItem('email', data.email);
    dispatch(login(data));
  };

  useEffect(() => {
    if (token !== null) {
      const decodedToken = decodeToken(token);
      const { roleId, userName, userId } = decodedToken;
      const user = {
        id: userId,
        name: userName
      };
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('myToken', token);
      if (roleId === 1) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/dashboard/users');
      } else if (roleId === 2) {
        localStorage.setItem('isSeller', 'true');
        navigate('/dashboard/seller');
      } else if (roleId === 3) {
        localStorage.setItem('isBuyer', 'true');
        navigate(`/`);
      }
    }
    if (isSuccess) {
      // is he a seller
      if (localStorage.getItem('isSeller')) {
        // create popup
        document.querySelector('.overlay').style.display = 'flex';
        if (changePassword) {
          setOpenChangePassword(true);

          setTimeout(() => {
            navigate(`/reset-password/passsword`);
            localStorage.setItem('changePassword', true);
          }, 8000);
        }
      } else {
        if (localStorage.getItem('isBuyer')) {
          if (changePassword) {
            setOpenChangePassword(true);

            setTimeout(() => {
              navigate(`/reset-password/${encodeURIComponent(token)}`);
              localStorage.setItem('changePassword', true);
            }, 8000);
          } else {
            navigate(`/`);
          }
        }
        if (localStorage.getItem('isAdmin')) {
          if (changePassword) {
            setOpenChangePassword(true);

            setTimeout(() => {
              navigate(`/reset-password/${encodeURIComponent(token)}`);
              localStorage.setItem('changePassword', true);
            }, 8000);
          } else {
            navigate('/dashboard/users');
          }
        }
      }
    }
  }, [dispatch, isSuccess, token]);

  const showForgotPass = () => {
    setOpenPopUp(true);
  };

  return (
    <>
      {openPopUp && (
        <PopupMaker
          open={openPopUp}
          Component={ForgetPassword}
          setOpen={setOpenPopUp}
        />
      )}

      <div>
        <InputPopup
          title='2FA Verification'
          details='Please check your email for the token to complete the Two-Factor
Authentication process.'
          inputError='Please Enter Token'
          button='Verify'
          placeholder='Enter Token'
        />
      </div>

      <div className='loginPage'>
        <div className='flex justify-center items-center'>
          <div className='loginPage__parent'>
            <div className='loginPage__mobileHeader'>
              <div className='loginPage__imgHeader'>
                <Link to='/'>
                  <img src={TLogo} alt='' />
                </Link>
              </div>
              <div className='loginPage__signInHeader'>
                <Button variant='contained'>
                  <Link to='/signup'>Sign up</Link>
                </Button>
              </div>
            </div>
            <div className='loginPage__title'>
              <Typography variant='h4' sx={{ fontSize: 'x-large' }}>
                Sign In
              </Typography>
            </div>
            {openChangePassword && <ChangePassword />}

            <div className='loginPage__form'>
              <form onSubmit={handleSubmit(mySubmit)} noValidate>
                <div className='loginPage__input'>
                  <input
                    type='text'
                    id='email'
                    name='email'
                    {...register('email', {
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Invalid email'
                      },
                      required: 'Email is required'
                    })}
                    className='text-xl'
                    required
                  />
                  <label htmlFor='email'>Email</label>
                  <p className='loginPage__error'>{errors.email?.message}</p>
                </div>
                <div className='loginPage__input'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    {...register('password', {
                      required: 'Password is required'
                    })}
                    className='text-xl'
                    required
                  />
                  <label htmlFor='password'>Password</label>
                  <p className='loginPage__error'>{errors.password?.message}</p>
                  {isError && (
                    <p className='loginPage__error'>
                      {' '}
                      Wrong email or password!
                    </p>
                  )}
                </div>

                <div className='loginPage__forgotcode'>
                  <Typography variant='body1' onClick={showForgotPass}>
                    Forgot your password?
                  </Typography>
                </div>
                <div className='loginPage__button'>
                  <button
                    type='submit' data-testid='log_in'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 border border-blue-200 rounded'
                  >
                    {isLoading ? <Loading /> : 'SIGN IN'}
                  </button>
                </div>
              </form>
            </div>
            <Link
              to={`${GOOGLE_AUTH_URL}/api/auth/google`}
              onClick={() => {
                return localStorage.setItem('googleLogin', 'true');
              }}
            >
              <div className='loginPage__googleAuth'>
                <div className='loginPage__googleButton'>
                  <div>
                    <img src={Google} alt='' />
                  </div>
                  <div>
                    <Typography variant='body2'>Sign in with google</Typography>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <AuthBlueSide
          button='SIGN UP'
          route='/signup'
          heading='Create Your Account'
        />
      </div>
    </>
  );
};

export default LoginContainer;
