import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoPath from "../../images/Reused/logo.png";
import accountPath from "../../images/Header/account-icon.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation.js";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className='header'>
      {pathname === "/" ? (
        <div className='header__landing'>
          <Link to='/' className='header__logo-link'>
            <img className='header__logo' src={logoPath} alt='логотип' />
          </Link>
          <div className='header__auth-links'>
            <Link to='/signup' className='header__register-link'>
              Регистрация
            </Link>
            <Link to='signin' className='header__login-link'>
              Войти
            </Link>
          </div>
        </div>
      ) : (
        <div className='header__logged-in'>
          <Link to='/' className='auth-form__logo-link'>
            <img className='auth-form__logo' src={logoPath} alt='логотип' />
          </Link>
          <Navigation />
          <Link to='./profile' className='header__profile-link'>
            <img
              className='header__account-icon'
              src={accountPath}
              alt='иконка аккаунта'
            />
            Аккаунт
          </Link>
        </div>
      )}
    </header>
  );
}
export default Header;
