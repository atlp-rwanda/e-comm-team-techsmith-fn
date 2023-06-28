import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup, reset } from '../states/features/auth/authSlice';
import TLogo from '../assets/images/T_Logo.png';
import Loading from '../components/Loading';
import AuthBlueSide from '../components/AuthBlueSide';
import {
  successNotification,
  ErrorNotification
} from '../components/Notification';

const SignupContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setOpen] = useState(false);
  const form = useForm();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;
  const password = watch('password');
  const confirmPassword = watch('cPassword');
  const [, setEmail] = useState(' ');
  const [, setName] = useState(' ');

  const { isLoading, isSuccess, isError,message } = useSelector((state) => {
    return state.auth;
  });

  const mySubmit = async (data) => {
    if (password === confirmPassword) {
      dispatch(signup(data));
      setOpen(true);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    const nameParam = urlParams.get('name');
    const decodedEmail = emailParam ? decodeURIComponent(emailParam) : '';
    const decodedName = nameParam ? decodeURIComponent(nameParam) : '';

    setEmail(decodedEmail);
    setName(decodedName);

    if (message !== "") {
      if (isError) {
        ErrorNotification(message);
      } else {
        successNotification(message);
        setTimeout(() => {
          dispatch(reset());
          navigate('/login');
        }, 5000);
      }
   
    }
  }, [dispatch, isSuccess,isError]);

  return (
    <div className='signupPage'>
      <div>
        <div className='signupPage__mobileHeader'>
          <div className='signupPage__imgHeader'>
            <Link to='/'>
              <img src={TLogo} alt='' />
            </Link>
          </div>
          <div className='signupPage__signInHeader'>
            <Button variant='contained'>
              <Link to='/login'>Sign in</Link>
            </Button>
          </div>
        </div>
        <div className='signupPage__title'>
          <Typography variant='h4'>
            Create your account on Techsmiths!
          </Typography>
        </div>
        <div className='signupPage__form'>
          <form onSubmit={handleSubmit(mySubmit)}>
            <div className='signupPage__input'>
              <input
                type='text'
                id='lname'
                name='name'
                onChange={(e) => {
                  return setEmail(e.target.value);
                }}
                {...register('name', {
                  required: {
                    value: true,
                    message: (
                      <p className='signupPage__error'>Full name is required</p>
                    )
                  }
                })}
                required
              />
              <label htmlFor='lname'>Full Name</label>
              <p>{errors.name?.message}</p>
            </div>

            <div className='signupPage__input'>
              <input
                type='text'
                id='email'
                name='email'
                onChange={(e) => {
                  return setEmail(e.target.value);
                }}
                {...register('email', {
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: <p className='signupPage__error'>Invalid email</p>
                  },
                  required: {
                    value: true,
                    message: (
                      <p className='signupPage__error'>Email is required</p>
                    )
                  }
                })}
                required
              />
              <label htmlFor='email'>Email</label>
              <p className='signupPage__error'>{errors.email?.message}</p>
            </div>

            <label className='signupPage_label'>Birthday</label>
            <div className='signupPage__input'>
              <input
                type='date'
                id='birthday'
                name='birthday'
                {...register('birthday', {
                  required: {
                    value: true,
                    message: (
                      <p className='signupPage__error'>Birthday is required</p>
                    )
                  }
                })}
                required
              />
              <p>{errors.birthday?.message}</p>
            </div>

            <div className='signupPage__input'>
              <input
                type='text'
                id='address'
                name='address'
                {...register('address', {
                  required: {
                    value: true,
                    message: (
                      <p className='signupPage__error'>
                        Please enter the address
                      </p>
                    )
                  }
                })}
                required
              />
              <label htmlFor='address'>Address</label>
              <p>{errors.address?.message}</p>
            </div>

            <div className='gender_role_box'>
              <div className='input-label-group'>
                <div className='input-label'>
                  <label htmlFor='gender'>Gender</label>
                </div>
                <div className='input-field'>
                  <select
                    id='gender'
                    name='gender'
                    {...register('gender', {
                      required: {
                        value: true,
                        message: (
                          <p className='signupPage__error'>
                            Select your gender
                          </p>
                        )
                      }
                    })}
                  >
                    <option value=''>Choose gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                  </select>
                </div>
              </div>
              <div className='input-label-group'>
                <div className='input-label'>
                  <label htmlFor='role'>Role</label>
                </div>
                <div className='input-field'>
                  <select id='role' name='role' {...register('role')}>
                    <option value=''>Choose role</option>
                    <option value='3'>Buyer</option>
                    <option value='2'>Seller</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='signupPage__input'>
              <input
                type='text'
                id='language'
                name='language'
                {...register('language', {
                  required: {
                    value: true,
                    message: (
                      <p className='signupPage__error'>
                        Enter your preferred language
                      </p>
                    )
                  }
                })}
                required
              />
              <label htmlFor='language'>Language</label>
              <p>{errors.language?.message}</p>
            </div>

            <div className='password_confirmPassword_form'>
              <div className='signupPage__input'>
                <input
                  type='password'
                  id='password'
                  name='password'
                  {...register('password', {
                    required: {
                      value: true,
                      message: (
                        <p className='signupPage__error'>
                          Password is required
                        </p>
                      )
                    }
                  })}
                  required
                />
                <label htmlFor='password'>Password</label>
                <p>{errors.password?.message}</p>
              </div>
              <div className='signupPage__input'>
                <input
                  type='password'
                  id='cPassword'
                  name='cPassword'
                  {...register('cPassword', {
                    required: {
                      value: true,
                      message: 'Re-enter the password to confirm'
                    }
                  })}
                  required
                />
                <label htmlFor='password'>Confirm password</label>
                {password !== confirmPassword && (
                  <p className='signupPage__error'>Passwords do not match</p>
                )}
                <p className='signupPage__error'>{errors.cpassword?.message}</p>
              </div>
            </div>
            <div className='signupPage__button'>
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
      <AuthBlueSide
        heading='Already have an account'
        button='SIGN IN'
        onClick={() => {
          navigate('/login');
        }}
        description='To keep connected with us please login in here!'
      />
       <ToastContainer />
    </div>
  );
};

export default SignupContainer;
