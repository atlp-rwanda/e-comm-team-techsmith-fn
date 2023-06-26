import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const SellerRoutes = () => {
  const isSeller = JSON.parse(localStorage.getItem('isSeller'));
  const token = localStorage.getItem('myToken');

  return isSeller && token ? <Outlet /> : <Navigate to='/seller/unauthorized' />;
};

export default SellerRoutes;
