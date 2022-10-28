import { useState, useEffect } from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import logoPath from "../../images/Reused/logo.png";
import accountPath from "../../images/Header/account-icon.png";
import "./Header.css";
import Navigation from "../Navigation/Navigation.js";

function Header() {
  const { pathname } = useLocation();

  const [isDesktop, setDesktop] = useState(window.innerWidth > 800);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 800);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
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
        <header className='header__logged-in'>
          <Link to='/' className='header__logo-link'>
            <img className='header__logo' src={logoPath} alt='логотип' />
          </Link>
          {(() => {
            if (isDesktop) {
              return (
                <>
                  <Navigation />
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
              return <button className='header__menu-burger' />;
            }
          })()}
        </header>
      </Route>
    </Switch>
  );
}
export default Header;
