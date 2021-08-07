import React from 'react';
import alertReducer from './alertReducer';

const { createContext, useReducer } = require('react');

export const AlertContext = createContext();

const initialState = {
  alert: null,
};

export const AlertProvider = ({ children }) => {
  const [{ alert }, dispatch] = useReducer(alertReducer, initialState);

  const showAlert = ({ type = 'success', message }) => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: { type, message },
    });
    setTimeout(() => {
      hideAlert();
    }, 5000);
  };
  const hideAlert = () => {
    dispatch({
      type: 'HIDE_ALERT',
    });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
