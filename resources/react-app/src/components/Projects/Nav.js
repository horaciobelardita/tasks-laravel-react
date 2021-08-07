import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth/authContext';

export const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className="bg-dark text-white d-flex justify-content-between p-3 align-items-center">
      <p className="h3">Hola {user.name}</p>
      <button onClick={() => logout()} className="btn btn-outline-light">
        Cerrar Sesión
      </button>
    </header>
  );
};
