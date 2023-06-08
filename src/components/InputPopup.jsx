import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { login2FA } from '../states/features/auth/authSlice';

const InputPopup = ({ title, details, inputError, button, placeholder }) => {
  const popup = useRef(null);
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSeller, message, isError, isLoading } = useSelector((state) => {
    return state.auth;
  });

  const Verify = async (data) => {
    dispatch(login2FA(data.token));
  };

  useEffect(() => {
    if (isSeller) {
      navigate('/');
    }
  }, [dispatch, isSeller]);

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
          />
          <p
            className='text-red-700 text-sm px-1 py-1 rounded relative'
            role='alert'
          >
            {errors.token?.message}
          </p>

          {isError && (
            <p
              className='text-red-700 text-sm px-1 py-1 rounded relative'
              role='alert'
            >
              {message}
            </p>
          )}

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
              {isLoading ? <Loading /> : button}
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
  details: PropTypes.string.isRequired,
  inputError: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};
