import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { currentToken as Auth } from '../states/features/auth/authSlice';

const ProtectedRoutes = () => {
  return Auth ? <Outlet /> : <Navigate to='/unauthorized' />;
};

export default ProtectedRoutes;
