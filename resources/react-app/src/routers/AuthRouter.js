import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { NewAccount } from '../components/auth/NewAccount';
import { Login } from '../components/auth/Login';
export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/crear-cuenta" component={NewAccount} />
      <Redirect to="/" />
    </Switch>
  );
};
