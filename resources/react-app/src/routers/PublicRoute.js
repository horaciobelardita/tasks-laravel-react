import React from 'react';
import { Route, Redirect } from 'react-router-dom';
export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return !isAuthenticated ? (
    <Route component={(props) => <Component {...props} />} {...rest} />
  ) : (
    <Redirect to="/proyectos" />
  );
};
