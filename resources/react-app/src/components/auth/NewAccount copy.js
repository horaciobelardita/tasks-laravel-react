import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/alerts/alertContext';
import { Input } from './Input';

const initialState = {
  email: { value: '', hasErrors: false },
  password: { value: '', hasErrors: false },
  name: { value: '', hasErrors: false },
  confirmation_password: { value: '', hasErrors: false },
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmation_password: yup.string().min(6).required(),
});

export const NewAccount = () => {
  const { showAlert, alert } = useContext(AlertContext);

  useEffect(() => {
    document.querySelector('#root').classList.add('root');
    return () => document.querySelector('#root').classList.remove('root');
  }, []);
  const [user, setUser] = useState(initialState);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setUser({
      ...user,
      [name]: { ...user[name], value },
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const allFieldsAreEmpty = Object.keys(user).every(
      (key) => user[key].value === ''
    );
    if (allFieldsAreEmpty) {
      showAlert({
        type: 'danger',
        message: 'Todos los campos son requeridos',
      });
      return;
    }
    if (user.password.value.length < 6) {
      showAlert({
        type: 'danger',
        message: 'La contraseña debe contener al menos 6 caracteres',
      });
      return;
    }
    if (user.password.value !== user.confirmation_password.value) {
      showAlert({
        type: 'danger',
        message: 'La contraseña deben coincidir',
      });
      return;
    }
  };

  const { handleSubmit } = useForm();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              {alert && (
                <div className={`alert alert-${alert.type}`}>
                  {alert.message}
                </div>
              )}
              <h2 className="card-title">Crear Cuenta</h2>
              <form onSubmit={handleFormSubmit}>
                <Input
                  name="name"
                  onChange={handleOnChange}
                  placeholder="Nombre"
                  autoFocus
                  value={user.name.value}
                  hasError={user.name.hasErrors}
                />
                <Input
                  onChange={handleOnChange}
                  type="email"
                  name="email"
                  value={user.email.value}
                  hasError={user.email.hasErrors}
                  placeholder="E-mail"
                />
                <Input
                  onChange={handleOnChange}
                  type="password"
                  name="password"
                  value={user.password.value}
                  hasError={user.password.hasErrors}
                  placeholder="Contraseña"
                />
                <Input
                  onChange={handleOnChange}
                  type="password"
                  name="confirmation_password"
                  value={user.confirmation_password.value}
                  hasError={user.confirmation_password.hasErrors}
                  placeholder="Repetí tu contraseña"
                />
                <button className="btn btn-primary btn-block">
                  Registrarse
                </button>
              </form>
              <p className="m-0 mt-2">
                <Link to="/">Ya tienes cuenta?</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
