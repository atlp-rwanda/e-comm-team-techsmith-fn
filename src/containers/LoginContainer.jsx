import React, { useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Google from '../assets/images/google.png';
import AuthBlueSide from '../components/AuthBlueSide';
import TLogo from '../assets/images/T_Logo.png';
import Loading from '../components/Loading';
import InputPopup from '../components/InputPopup';
import { login, reset } from '../states/features/auth/authSlice';
import { API_URL } from '../constants';

const LoginContainer = () => {
  const form = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { isLoading, isError, isSuccess } = useSelector((state) => {
    return state.auth;
  });

  const mySubmit = async (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isSuccess) {
      // is he a seller
      if (localStorage.getItem('isSeller')) {
        // create popup
        document.querySelector('.overlay').style.display = 'flex';
      } else {
        navigate('/');
      }
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  return (
    <>
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
        <div>
          <div className='loginPage__mobileHeader'>
            <div className='loginPage__imgHeader'>
              <img src={TLogo} alt='' />
            </div>
            <div className='loginPage__signInHeader'>
              <Button variant='contained'>Sign up</Button>
            </div>
          </div>
          <div className='loginPage__title'>
            <Typography variant='h4' sx={{ fontSize: 'x-large' }}>
              Sign In
            </Typography>
          </div>

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
                  <p className='loginPage__error'> Wrong email or password!</p>
                )}
              </div>

              <div className='loginPage__forgotcode'>
                <Typography variant='body1'>Forgot your password?</Typography>
              </div>
              <div className='loginPage__button'>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 border border-blue-200 rounded'
                >
                  {isLoading ? <Loading /> : 'SIGN IN'}
                </button>
              </div>
            </form>
          </div>
          <Link to={`${API_URL}/auth/google`}>
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
        <AuthBlueSide
          button='Sign up'
          onClick={() => {
            navigate('/signup');
          }}
          heading='Create Your Account'
        />
      </div>
    </>
  );
};

export default LoginContainer;
