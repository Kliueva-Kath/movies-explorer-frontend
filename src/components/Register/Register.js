import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import { nameRegExp, emailRegExp } from "../../utils/constants.js";

function Register({ onRegistration }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegistration(values);
    resetForm();
  }

  return (
    <main className='register'>
      <AuthForm
        title='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        name='register'
        onSubmit={handleSubmit}
        isValid={isValid}>
        <label htmlFor='name' className='auth-form__label'>
          Имя
        </label>
        <input
          name='name'
          value={values.name || ""}
          className={`auth-form__input ${
            errors.name && "auth-form__input_error"
          }`}
          placeholder='Имя'
          minLength='2'
          maxLength='30'
          pattern={nameRegExp}
          onChange={handleChange}
          required
        />
        <span className='auth-form__input-error'>{errors.name}</span>
        <label htmlFor='email' className='auth-form__label'>
          E-mail
        </label>
        <input
          type='email'
          name='email'
          value={values.email || ""}
          className={`auth-form__input ${
            errors.email && "auth-form__input_error"
          }`}
          placeholder='Email'
          onChange={handleChange}
          pattern={emailRegExp}
          required
        />
        <span className='auth-form__input-error'>{errors.email}</span>
        <label htmlFor='password' className='auth-form__label'>
          Пароль
        </label>
        <input
          type='password'
          name='password'
          minLength='8'
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
        Уже зарегистрированы?
        <Link to='/signin' className='auth-form__redirect-link'>
          Войти
        </Link>
      </p>
    </main>
  );
}

export default Register;
