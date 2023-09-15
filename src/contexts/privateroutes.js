import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
