import { useEffect } from "react";
import "./MobileMenu.css";
import { NavLink, Link } from "react-router-dom";
import accountPath from "../../images/Header/account-icon.svg";

function MobileMenu({ isMenuOpen, toggleMenu }) {
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isMenuOpen]);

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      toggleMenu();
    }
  }

  function handleCloseByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      toggleMenu();
    }
  }

  return (
    <div
      className={`menu ${isMenuOpen && "menu_open"}`}
      onClick={handleCloseByOverlayClick}>
      <div className='menu__popup'>
        <button className='menu__close-button' onClick={toggleMenu} />
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
    </div>
  );
}

export default MobileMenu;
