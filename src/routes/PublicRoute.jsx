import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  
  if (user) {
    return <Navigate to="/myaccount" />;
  }
  
  return children;
};