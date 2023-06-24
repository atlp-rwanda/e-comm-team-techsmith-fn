import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const Auth = localStorage.getItem('myToken');
  return Auth ? <Outlet /> : <Navigate to='/unauthorized' />;
};

export default ProtectedRoutes;
