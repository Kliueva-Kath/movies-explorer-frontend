import React from "react";
import "./Portfolio.css";
import arrowPath from "../../images/Main/portfolio__arrow.svg";

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__header'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://kliueva-kath.github.io/how-to-learn/'
            target='_blank'
            rel='noopener noreferrer'>
            Статичный сайт
          </a>
          <img
            className='portfolio__arrow'
            alt='Перейти на сайт'
            src={arrowPath}
          />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://kliueva-kath.github.io/russian-travel/'
            target='_blank'
            rel='noopener noreferrer'>
            Адаптивный сайт
          </a>
          <img
            className='portfolio__arrow'
            alt='Перейти на сайт'
            src={arrowPath}
          />
        </li>
        <li className='portfolio__item'>
          <a
            className='portfolio__link'
            href='https://mesto.kliueva.nomoredomains.club'
            target='_blank'
            rel='noopener noreferrer'>
            Одностраничное приложение
          </a>
          <img
            className='portfolio__arrow'
            alt='Перейти на сайт'
            src={arrowPath}
          />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
