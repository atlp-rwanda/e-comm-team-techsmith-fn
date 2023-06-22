import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AdminRoutes = () => {
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  return isAdmin ? <Outlet /> : <Navigate to='/admin/unauthorized' />;
};

export default AdminRoutes;
