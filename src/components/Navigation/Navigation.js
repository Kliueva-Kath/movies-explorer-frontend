import React from "react";
import "./Navigation.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import accountPath from "../../images/Header/account-icon.svg";

function Navigation({ isLoggedIn }) {
  const { pathname } = useLocation();

  if (isLoggedIn) {
    return (
      <>
        <nav
          className={
            pathname === "/"
              ? "header__nav-bar_landing"
              : "header__nav-bar_movies"
          }>
          <NavLink
            to='/movies'
            activeClassName='header__nav-link_active'
            className='header__nav-link'>
            Фильмы
          </NavLink>
          <NavLink
            to='/saved-movies'
            activeClassName='header__nav-link_active'
            className='header__nav-link'>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <Link to='/profile' className='header__profile-link'>
          Аккаунт
          <img
            className='header__account-icon'
            src={accountPath}
            alt='иконка аккаунта'
          />
        </Link>
      </>
    );
  } else {
    return (
      <div className='header__auth-links'>
        <Link to='/signup' className='header__register-link'>
          Регистрация
        </Link>
        <Link to='signin' className='header__login-link'>
          Войти
        </Link>
      </div>
    );
  }
}

export default Navigation;
