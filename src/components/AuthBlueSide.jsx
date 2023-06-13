import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { TlogoW } from '../assets';

const AuthBlueSide = ({ button, heading, description, onClick }) => {
  return (
    <div className='blueSide'>
      <div className='blueSide--width'>
        <div className='blueSide__logo flex justify-center'>
          <img src={TlogoW} alt='' />
        </div>
        <div className='blueSide__details '>
          <div className='blueSide__title pb-12'>
            <Typography variant='h4'>{heading}</Typography>
          </div>
          <div className='blueSide__info pb-12'>
            <Typography variant='body1'>{description}</Typography>
          </div>
        </div>
        <div className='blueSide__button'>
          <button
          className='py-2 px-4 font-medium mt-3'
            type='submit'
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
