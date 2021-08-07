import React from 'react';

export const Input = ({
  type = 'text',
  name,
  placeholder,
  error,
  register,
  ...rest
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        {...register(name)}
        placeholder={placeholder}
        className={`form-control ${error?.[name] ? 'is-invalid' : ''}`}
        {...rest}
      />
      {error[name]?.message && (
        <span className="text-danger">{error[name].message}</span>
      )}
    </div>
  );
};
