import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(values);
  }
  return (
    <main className='login'>
      <AuthForm
        title='Рады видеть!'
        buttonText='Войти'
        name='login'
        onSubmit={handleSubmit}
        isValid={isValid}>
        <label htmlFor='email' className='auth-form__label'>
          E-mail
        </label>
        <input
          type='email'
          name='email'
          className={`auth-form__input ${
            errors.email && "auth-form__input_error"
          }`}
          placeholder='Email'
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className='auth-form__input-error'>{errors.email}</span>
        <label htmlFor='password' className='auth-form__label'>
          Пароль
        </label>
        <input
          type='password'
          name='password'
          value={values.password || ""}
          className={`auth-form__input ${
            errors.password && "auth-form__input_error"
          }`}
          placeholder='Пароль'
          onChange={handleChange}
          required
        />
        <span className='auth-form__input-error'>{errors.password}</span>
      </AuthForm>
      <p className='auth-form__redirect'>
        Ещё не зарегистрированы?
        <Link to='/signup' className='auth-form__redirect-link'>
          Регистрация
        </Link>
      </p>
    </main>
  );
}

export default Login;
