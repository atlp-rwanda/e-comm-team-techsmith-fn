// -----login ----
/_ eslint-disable jsx-a11y/label-has-associated-control _/
/_ eslint-disable import/no-unresolved _/
/_ eslint-disable import/no-extraneous-dependencies _/
/_ eslint-disable import/order _/
import React, { useState, useEffect } from 'react';
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
import InputPopup from '../components/InputPopup';

const LoginContainer = () => {
const [loading, setLoading] = useState(false);
const [incorrectCred, setIncorrectCred] = useState(null);
const form = useForm();
const navigate = useNavigate();
const dispatch = useDispatch();
const { register, handleSubmit, setValue, formState } = form;
const { errors } = formState;

const mySubmit = async (data) => {
// remember the inputed data and save them in local storage
if (data.rememberMe) {
localStorage.setItem('rememberedEmail', data.email);
localStorage.setItem('rememberedPassword', data.password);
} else {
localStorage.removeItem('rememberedEmail');
localStorage.removeItem('rememberedPassword');
}

    setLoading(true);
    await axios
      .post(`${API_URL}/users/login`, data)
      .then((response) => {
        const mytoken = response.data.Authorization;

        dispatch(getToken(mytoken));

        if (!response.data.user) {
          document.querySelector('.overlay').style.display = 'flex';
          setLoading(false);

          return;
        }

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

useEffect(() => {
const rememberedEmail = localStorage.getItem('rememberedEmail');
const rememberedPassword = localStorage.getItem('rememberedPassword');
if (rememberedEmail && rememberedPassword) {
setValue('email', rememberedEmail);
setValue('password', rememberedPassword);
}
}, [register]);

return (
<>
<div>
<InputPopup
title='2FA Verification'
api={`${API_URL}/users/login`}
method='get'
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
                {incorrectCred && (
                  <p className='loginPage__error'> {incorrectCred}</p>
                )}
              </div>

              {/* ______ remember me _________ */}

              <div className='flex items-center mb-4'>
                <input
                  type='checkbox'
                  {...register('rememberMe')}
                  className='mr-2 rounded cursor-pointer text-blue-500 text-2xl'
                  id='remember'
                />
                <label htmlFor='remember' className='text-gray-500 text-2xl'>
                  Remember me
                </label>
              </div>

              <div className='loginPage__forgotcode'>
                <Typography variant='body1'>Forgot your password?</Typography>
              </div>
              <div className='loginPage__button'>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-200 rounded'
                >
                  {loading ? <Loading /> : 'SIGN IN'}
                </button>
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
        <AuthBlueSide button='Sign UP' heading='Create Your Account' />
      </div>
    </>

);
};

export default LoginContainer;

// ------ signup ------
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';

const InputPopup = ({
title,
api,
method,
details,
inputError,
button,
placeholder
}) => {
const popup = useRef(null);
const form = useForm();
const { register, handleSubmit, formState } = form;
const { errors } = formState;
const [token, setToken] = useState();
const [validity, setValidity] = useState(null);
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

const Verify = async () => {
setLoading(true);
await axios[method](`${api}/${token}`)
.then((response) => {
if (!response.data.Authorization) {
setValidity('Token Expired. Generate a new token!');
setLoading(false);
return;
}
navigate('/');
})
.catch(() => {
setLoading(false);
setValidity('Try Again Later! Server Error.');
});
};

return (
<div className='overlay' ref={popup}>
<div className='popup'>
<p className='text-gray-700 text-3xl py-3 capitalize'>{title}</p>
<form onSubmit={handleSubmit(Verify)} noValidate>
<input
type='password'
id='wide-input'
className='w-full py-2 px-4 border border-gray-300 rounded mb-4 text-xl'
placeholder={placeholder}
name='token'
{...register('token', {
required: {
value: true,
message: `${inputError}`
}
})}
required
onChange={(e) => {
return setToken(e.target.value);
}}
/>
<p
            className='text-red-700 text-sm px-1 py-1 rounded relative'
            role='alert'
          >
{errors.token?.message}
</p>
<p
            className='text-red-700 text-sm px-1 py-1 rounded relative'
            role='alert'
          >
{validity}
</p>

          <p className='text-gray-500 text-xl '>{details}</p>

          <div className='p-4 flex justify-end'>
            <button
              className='mr-2 px-4 py-2 bg-gray-500 text-white rounded text-xl'
              type='button'
              onClick={() => {
                popup.current.style.display = 'none';
              }}
            >
              Close
            </button>
            <button
              className='px-4 py-2 bg-blue-900 text-white rounded text-xl'
              type='submit'
            >
              {loading ? <Loading /> : button}
            </button>
          </div>
        </form>
      </div>
    </div>

);
};

export default InputPopup;

InputPopup.propTypes = {
title: PropTypes.string.isRequired,
api: PropTypes.string.isRequired,
method: PropTypes.string.isRequired,
details: PropTypes.string.isRequired,
inputError: PropTypes.string.isRequired,
button: PropTypes.string.isRequired,
placeholder: PropTypes.string.isRequired
};
