import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TlogoW } from '../assets';
import Button from './Button';

const AuthBlueSide = ({ button, heading, description, route }) => {
  return (
    <div className='blueSide'>
      <div className='blueSide--width'>
        <div className='blueSide__logo flex justify-center'>
          <Link to='/'>
            <img src={TlogoW} alt='' />
          </Link>
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
          <Button
            value={button}
            route={route}
            className='font-medium mt-3 bg-white rounded-lg px-8 py-4 w-fit text-primary'
          />
        </div>
      </div>
    </div>
  );
};

AuthBlueSide.propTypes = {
  button: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  route: PropTypes.string.isRequired
};

AuthBlueSide.defaultProps = {
  description: 'Enter your personal details and start your journey with us'
};

export default AuthBlueSide;
