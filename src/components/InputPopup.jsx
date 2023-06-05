import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

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

  const Verify = async () => {
    await axios[method](`${api}/${token}`)
      .then((response) => {
        if (!response.data.Authorization) {
          setValidity('Token Expired. Generate a new token!');
          return;
        }
        navigate('/');
      })
      .catch(() => {
        setValidity('Try Again Later! Server Error.');
      });
  };

  return (
    <div className='overlay' ref={popup}>
      <div className='popup'>
        <p className='text-gray-700 text-xl py-3 capitalize'>{title}</p>
        <form onSubmit={handleSubmit(Verify)} noValidate>
          <input
            type='password'
            id='wide-input'
            className='w-full py-2 px-4 border border-gray-300 rounded mb-4'
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
            className='text-red-700 text-xs px-1 py-1 rounded relative'
            role='alert'
          >
            {errors.token?.message}
          </p>
          <p
            className='text-red-700 text-xs px-1 py-1 rounded relative'
            role='alert'
          >
            {validity}
          </p>

          <p className='text-gray-500 text-sm '>{details}</p>

          <div className='p-4 flex justify-end'>
            <button
              className='mr-2 px-4 py-2 bg-gray-500 text-white rounded'
              type='button'
              onClick={() => {
                popup.current.style.display = 'none';
              }}
            >
              Close
            </button>
            <button
              className='px-4 py-2 bg-blue-900 text-white rounded'
              type='submit'
            >
              {button}
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
