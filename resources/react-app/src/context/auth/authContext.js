import React from 'react';
import api from '../../config/axios';
import { createContext, useReducer } from 'react';
import authReducer from './authReducer';
import {
  AUTHENTICATED_USER_FETCHED_ERROR,
  AUTHENTICATED_USER_FETCHED_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_ERROR,
  SIGN_OUT_SUCCESS,
  USER_ERROR_CREATED,
  USER_SUCCESSFULLY_CREATED,
} from './actions';
import authToken from '../../config/authToken';

const initialState = {
  token: localStorage.getItem('token'),
  messages: null,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const registerUser = async (user) => {
    try {
      const response = await api.post('/register', user);
      dispatch({ type: USER_SUCCESSFULLY_CREATED, payload: response.data });
    } catch (error) {
      dispatch({
        type: USER_ERROR_CREATED,
        payload: error.response.data.errors,
      });
    }
  };
  const signIn = (credentials) => {
    api
      .post('/login', credentials)
      .then(({ data }) => {
        dispatch({ type: SIGN_IN_SUCCESS, payload: data.token });
      })
      .catch((error) => {
        dispatch({ type: SIGN_IN_ERROR, payload: error.response.data.message });
      });
  };

  const logout = () => {
    const token = localStorage.getItem('token');
    authToken(token);
    api
      .post('/logout')
      .then(() => {
        dispatch({ type: SIGN_OUT_SUCCESS });
      })
      .catch((error) => {
        dispatch({
          type: SIGN_OUT_ERROR,
        });
      });
  };

  const getAuthenticatedUser = () => {
    const token = localStorage.getItem('token');
    authToken(token);
    api
      .post('/user', {})
      .then(({ data: { user } }) => {
        dispatch({ type: AUTHENTICATED_USER_FETCHED_SUCCESS, payload: user });
      })
      .catch((error) => {
        dispatch({
          type: AUTHENTICATED_USER_FETCHED_ERROR,
          payload: error.response.data,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, registerUser, signIn, getAuthenticatedUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
