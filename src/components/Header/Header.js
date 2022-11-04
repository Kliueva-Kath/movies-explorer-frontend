import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logoPath from "../../images/Reused/logo.svg";

import "./Header.css";
import Navigation from "../Navigation/Navigation.js";
import MobileMenu from "../MobileMenu/MobileMenu.js";

//TODO исправить header в состоянии loggedIn

function Header({ isLoggedIn }) {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  /*   return (
    <Switch>
      <Route exact path='/'>
        <header className='header__landing'>
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
        </header>
      </Route>
      <Route path={["/movies", "/saved-movies"]}>
        {!isDesktop && (
          <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        )}
        <header className='header__logged-in'>
          <Link to='/' className='header__logo-link'>
            <img className='header__logo' src={logoPath} alt='логотип' />
          </Link>
          {(() => {
            if (isDesktop) {
              return <Navigation isLoggedIn={isLoggedIn} />;
            } else {
              return (
                <button className='header__menu-burger' onClick={toggleMenu} />
              );
            }
          })()}
        </header>
      </Route>
    </Switch>
  ); */

  return (
    <header
      className={pathname === "/" ? "header__landing" : "header__logged-in"}>
      {!isDesktop && (
        <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      )}
      <Link to='/' className='header__logo-link'>
        <img className='header__logo' src={logoPath} alt='логотип' />
      </Link>
      {(() => {
        if (isDesktop) {
          return <Navigation isLoggedIn={isLoggedIn} />;
        } else {
          return (
            <button className='header__menu-burger' onClick={toggleMenu} />
          );
        }
      })()}
    </header>
  );
}
export default Header;
