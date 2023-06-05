/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Typography } from '@mui/material';
import TLogo from '../assets/images/TlogoW.png';

const AuthBlueSide = () => {
  return (
    <div className='blueSide'>
      <div className='blueSide--width'>
        <div className='blueSide__logo flex justify-center'>
          <img src={TLogo} alt='' />
        </div>
        <div className='blueSide__details'>
          <div className='blueSide__title'>
            <Typography variant='h4'>Create your account</Typography>
          </div>
          <div className='blueSide__info'>
            <Typography variant='body1'>
              Enter your personal details and start your journey with us
            </Typography>
          </div>
        </div>
        <div className='blueSide__button'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthBlueSide;
