import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const IsLoggedIn = () => {
  const isTokenAvailable = localStorage.getItem('myToken') !== null;

  return isTokenAvailable ? <Navigate to='/' />:<Outlet />;
};

export default IsLoggedIn;
