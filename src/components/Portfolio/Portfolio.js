import React from "react";
import "./Portfolio.css";
import arrowPath from "../../images/Main/portfolio__arrow.svg";

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__header'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <p className='portfolio__site'>Статичный сайт</p>
          <a
            className='portfolio__link'
            href='https://kliueva-kath.github.io/how-to-learn/'
            target='_blank'
            rel='noopener noreferrer'>
            <img
              className='portfolio__arrow'
              alt='Перейти на сайт'
              src={arrowPath}
            />
          </a>
        </li>
        <li className='portfolio__item'>
          <p className='portfolio__site'>Адаптивный сайт</p>
          <a
            className='portfolio__link'
            href='https://kliueva-kath.github.io/russian-travel/'
            target='_blank'
            rel='noopener noreferrer'>
            <img
              className='portfolio__arrow'
              alt='Перейти на сайт'
              src={arrowPath}
            />
          </a>
        </li>
        <li className='portfolio__item'>
          <p className='portfolio__site'>Одностраничное приложение</p>
          <a
            className='portfolio__link'
            href='https://mesto.kliueva.nomoredomains.club/sign-in'
            target='_blank'
            rel='noopener noreferrer'>
            <img
              className='portfolio__arrow'
              alt='Перейти на сайт'
              src={arrowPath}
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
