import React from "react";
import "./AuthForm.css";
import { Link } from "react-router-dom";
import logoPath from "../../images/Reused/logo.svg";

function AuthForm({
  title,
  children,
  buttonText,
  authError,
  name,
  onSubmit,
  isValid,
  isSubmitSuccessful,
}) {
  return (
    <div className='auth-form'>
      <Link to='/' className='auth-form__logo-link'>
        <img className='auth-form__logo' src={logoPath} alt='логотип' />
      </Link>
      <h2 className='auth-form__header'>{title}</h2>
      <form
        className={`auth-form__form auth-form__form_type_${name}`}
        onSubmit={onSubmit}>
        {children}
        {!isSubmitSuccessful && (
          <span className='auth-form__submit-error'>{authError}</span>
        )}
        <button
          type='submit'
          className={`auth-form__button auth-form__button_type_${name} ${
            !isValid && "auth-form__button_disabled"
          }`}
          disabled={!isValid}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
