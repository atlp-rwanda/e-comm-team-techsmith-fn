/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TLogo from '../assets/images/TlogoW.png';

const AuthBlueSide = ({ button, heading, description, onClick }) => {
  return (
    <div className='blueSide'>
      <div className='blueSide--width'>
        <div className='blueSide__logo flex justify-center'>
          <img src={TLogo} alt='' />
        </div>
        <div className='blueSide__details'>
          <div className='blueSide__title'>
            <Typography variant='h4'>{heading}</Typography>
          </div>
          <div className='blueSide__info'>
            <Typography variant='body1'>{description}</Typography>
          </div>
        </div>
        <div className='blueSide__button'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 border border-blue-700 rounded'
            onClick={onClick}
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

AuthBlueSide.propTypes = {
  button: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func
};

AuthBlueSide.defaultProps = {
  description: 'Enter your personal details and start your journey with us',
  onClick: () => {}
};

export default AuthBlueSide;
