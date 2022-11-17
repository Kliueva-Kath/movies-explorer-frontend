import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logoPath from "../../images/Reused/logo.svg";

import "./Header.css";
import Navigation from "../Navigation/Navigation.js";
import MobileMenu from "../MobileMenu/MobileMenu.js";

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
