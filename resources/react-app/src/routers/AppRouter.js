import React, { useState } from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Projects } from '../components/Projects';
import { useAuth } from '../context/auth/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const AppRouter = () => {
  const { isAuthenticated, getAuthenticatedUser, token } = useAuth();
  const [isChecking, setIsChecking] = useState(false);
  useEffect(() => {
    if (token) {
      setIsChecking(true);
      getAuthenticatedUser();
    }
    setIsChecking(false);
  }, [token]);
  if (isChecking)
    return (
      <div className="d-flex vh-100 vw-100 justify-content-center align-items-center">
        Cargando...
      </div>
    );
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={isAuthenticated}
            path="/"
            exact
            component={AuthRouter}
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/proyectos"
            exact
            component={Projects}
          />
          <Redirect to="/" />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
  );
};
