import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm.js";

function Login() {
  return (
    <>
      <AuthForm title='Рады видеть!' buttonText='Войти' name='login'>
        <label htmlFor='email' className='auth-form__label'>
          E-mail
        </label>
        <input
          type='email'
          value='pochta@yandex.ru'
          name='email'
          className='auth-form__input'
          required
        />
        <span className='auth-form__input-error'>Что-то пошло не так...</span>
        <label htmlFor='password' className='auth-form__label'>
          Пароль
        </label>
        <input
          type='password'
          value=''
          name='password'
          className='auth-form__input auth-form__input_error'
          required
        />
        <span className='auth-form__input-error'>Что-то пошло не так...</span>
      </AuthForm>
      <p className='auth-form__redirect'>
        Ещё не зарегистрированы?
        <Link to='/signup' className='auth-form__redirect-link'>
          Регистрация
        </Link>
      </p>
    </>
  );
}

export default Login;
