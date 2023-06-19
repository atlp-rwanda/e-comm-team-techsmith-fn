import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const SellerRoutes = () => {
  const isSeller = JSON.parse(localStorage.getItem('isSeller'));

  return isSeller ? <Outlet /> : <Navigate to='/seller/unauthorized' />;
};

export default SellerRoutes;
