import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const PrivalteRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);


  return userInfo? <Outlet /> :<Navigate to='/login' />
}

export default PrivalteRoute