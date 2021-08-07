import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/alerts/alertContext';
import { AuthContext } from '../../context/auth/authContext';

export const Login = () => {
  const { signIn, messages } = useContext(AuthContext);
  const { showAlert, alert } = useContext(AlertContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    document.querySelector('#root').classList.add('root');
    return () => document.querySelector('#root').classList.remove('root');
  }, []);

  useEffect(() => {
    if (!messages) return;
    showAlert({ type: 'danger', message: messages });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const onSubmit = (credentials) => {
    signIn(credentials);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Iniciar Sesión</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    autoFocus
                    {...register('email', { required: true })}
                    placeholder="Ingresá tu email."
                    className={`form-control ${
                      errors?.email ? 'is-invalid' : ''
                    }`}
                  />
                  {errors?.email && (
                    <span className="text-danger">Ingresa tu email</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    {...register('password', { required: true })}
                    placeholder="Ingresá tu contraseña"
                    className={`form-control ${
                      errors?.password ? 'is-invalid' : ''
                    }`}
                  />
                </div>
                {alert && (
                  <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                  </div>
                )}
                <button className="btn btn-primary btn-block">Ingresar</button>
              </form>
              <p className="mt-2">
                ¿No tenés cuenta?
                <Link to="/crear-cuenta" className="ml-2">
                  Crear Cuenta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
