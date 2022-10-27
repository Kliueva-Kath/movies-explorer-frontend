import React from "react";
import "./AuthForm.css";
import { Link } from "react-router-dom";
import logoPath from "../../images/Reused/logo.png";

function AuthForm({ title, children, buttonText }) {
  return (
    <div className='auth-form'>
      <Link to='/' className='auth-form__logo-link'>
        <img className='auth-form__logo' src={logoPath} alt='логотип' />
      </Link>
      <h2 className='auth-form__header'>{title}</h2>
      <form className='auth-form__form'>
        {children}
        <button type='submit' className='auth-form__button'>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
