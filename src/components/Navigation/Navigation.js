import React from "react";
import "./Navigation.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className='header__nav-bar'>
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
  );
}

export default Navigation;
