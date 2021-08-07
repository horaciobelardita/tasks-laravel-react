import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AlertContext } from '../../context/alerts/alertContext';
import { Input } from './Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../../context/auth/authContext';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  password_confirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const NewAccount = ({ history }) => {
  const { showAlert, alert } = useContext(AlertContext);
  const { registerUser, messages, isAuthenticated } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.querySelector('#root').classList.add('root');
    return () => document.querySelector('#root').classList.remove('root');
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.replace('/proyectos');
    }
  }, [isAuthenticated, history]);

  useEffect(() => {
    if (!messages) return;
    Object.keys(messages).forEach((key) => {
      showAlert({ type: 'danger', message: messages[key][0] });
    });
  }, [messages, showAlert]);

  const onSubmit = async (user) => {
    setIsSubmitting(true);
    await registerUser(user);
    setIsSubmitting(false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Crear Cuenta</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {alert && (
                  <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                  </div>
                )}
                <Input
                  error={errors}
                  name="name"
                  register={register}
                  placeholder="Nombre"
                  autoFocus
                />
                <Input
                  register={register}
                  error={errors}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
                <Input
                  error={errors}
                  register={register}
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                />
                <Input
                  error={errors}
                  register={register}
                  type="password"
                  name="password_confirmation"
                  placeholder="Repetí tu contraseña"
                />
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary btn-block"
                >
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
