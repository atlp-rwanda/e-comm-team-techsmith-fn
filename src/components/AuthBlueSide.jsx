import React from 'react';
import { Typography, Button } from '@mui/material';
import TLogo from '../assets/images/TlogoW.png';

const AuthBlueSide = () => {
  return (
    <div className='blueSide'>
      <div className='blueSide--width'>
        <div className='blueSide__logo'>
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
          <Button>Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default AuthBlueSide;
