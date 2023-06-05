/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Typography, Button } from '@mui/material';
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
            <Typography variant='body1'>
              {description}
            </Typography>
          </div>
        </div>
        <div className='blueSide__button'>
          <Button onClick={onClick}>{button}</Button>
        </div>
      </div>
    </div>
  );
};

AuthBlueSide.propTypes = {
  button: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
};

AuthBlueSide.defaultProps = {
  description: 'Enter your personal details and start your journey with us',
  onClick: () => {},
};

export default AuthBlueSide;
