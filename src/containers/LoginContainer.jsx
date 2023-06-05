/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import Google from '../assets/images/google.png';
import AuthBlueSide from '../components/AuthBlueSide';
import TLogo from '../assets/images/T_Logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { getToken } from '../states/features/login/actions';
import { API_URL } from '../constants';

const LoginContainer = () => {
  const [loading, setLoading] = useState(false);
  const [incorrectCred, setIncorrectCred] = useState(null);
  const form = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const mySubmit = async (data) => {
    setLoading(true);
    await axios
      .post(
        `${API_URL}/users/login`,
        data
      )
      .then((response) => {
        const mytoken = response.data.Authorization;
        dispatch(getToken(mytoken));
        navigate('/');
        setLoading(false);
      })
      .catch((err) => {
        setIncorrectCred(err.response.data.message);
        setTimeout(() => {
          setIncorrectCred(null);
        }, 3500);
        setLoading(false);
      });
  };

  return (
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
          <Typography variant='h4'>Sign In</Typography>
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
                    // eslint-disable-next-line no-useless-escape
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Invalid email'
                  },
                  required: 'Email is required'
                })}
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
                  required: {
                    value: true,
                    message: 'Password is required'
                  }
                })}
                required
              />
              <label htmlFor='password'>Password</label>
              <p className='loginPage__error'>{errors.password?.message}</p>
              {incorrectCred && (
                <p className='loginPage__error'> {incorrectCred}</p>
              )}
            </div>
            <div className='loginPage__forgotcode'>
              <Typography variant='body1'>Forgot your password?</Typography>
            </div>
            <div className='loginPage__button'>
              <Button type='submit' variant='contained'>
                {loading ? <Loading /> : 'SIGN IN'}
              </Button>
            </div>
          </form>
        </div>

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
      </div>
      <AuthBlueSide button='Sign Up' heading='Create your account' />
    </div>
  );
};

export default LoginContainer;
