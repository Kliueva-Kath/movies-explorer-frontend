import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm.js";

function Register() {
  return (
    <>
      <AuthForm
        title='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        name='register'>
        <label htmlFor='name' className='auth-form__label'>
          Имя
        </label>
        <input
          value='Виталий'
          name='name'
          className='auth-form__input'
          required
        />
        <span className='auth-form__input-error'>Что-то пошло не так...</span>
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
          value='password1'
          name='password'
          className='auth-form__input auth-form__input_error'
          required
        />
        <span className='auth-form__input-error auth-form__input-error_visible'>
          Что-то пошло не так...
        </span>
      </AuthForm>
      <p className='auth-form__redirect'>
        Уже зарегистрированы?
        <Link to='/signin' className='auth-form__redirect-link'>
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
