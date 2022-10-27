import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__desc'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__bottom-pannel'>
        <p className='footer__copyright'>&copy; 2022</p>
        <ul className='footer__links'>
          <li className='footer__item'>
            <a className='footer__link' href='https://practicum.yandex.ru/'>
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__item'>
            <a className='footer__link' href='https://github.com/Kliueva-Kath'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
