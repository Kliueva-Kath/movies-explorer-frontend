import React from "react";
import "./AuthForm.css";
import { Link } from "react-router-dom";
import logoPath from "../../images/Reused/logo.svg";

function AuthForm({ title, children, buttonText, name }) {
  return (
    <div className='auth-form'>
      <Link to='/' className='auth-form__logo-link'>
        <img className='auth-form__logo' src={logoPath} alt='логотип' />
      </Link>
      <h2 className='auth-form__header'>{title}</h2>
      <form className={`auth-form__form auth-form__form_type_${name}`}>
        {children}
        <button
          type='submit'
          className={`auth-form__button auth-form__button_type_${name}`}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
