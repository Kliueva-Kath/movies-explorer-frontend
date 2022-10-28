import React from "react";
import "./MobileMenu.css";
import { NavLink, Link } from "react-router-dom";
import accountPath from "../../images/Header/account-icon.png";

function MobileMenu({ isMenuOpen }) {
  return (
    <div className='menu'>
      <button className='menu__close-button' />
      <nav className='menu__nav-bar'>
        <NavLink
          exact
          to='/'
          activeClassName='menu__nav-link_active'
          className='menu__nav-link'>
          Главная
        </NavLink>
        <NavLink
          to='/movies'
          activeClassName='menu__nav-link_active'
          className='menu__nav-link'>
          Фильмы
        </NavLink>
        <NavLink
          to='/saved-movies'
          activeClassName='menu__nav-link_active'
          className='menu__nav-link'>
          Сохранённые фильмы
        </NavLink>
      </nav>
      <Link to='/profile' className='menu__profile-link'>
        Аккаунт
        <img
          className='menu__account-icon'
          src={accountPath}
          alt='иконка аккаунта'
        />
      </Link>
    </div>
  );
}

export default MobileMenu;
