import React from "react";
import "./AboutMe.css";
import photoPath from "../../images/Main/about-me__photo.jpg";

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__header main__header'>Студент</h2>
      <div className='about-me__student'>
        <div className='about-me__text-block'>
          <h3 className='about-me__name'>Екатерина</h3>
          <p className='about-me__job'>Фронтенд-разработчик, 27 лет</p>
          <p className='about-me__info'>
            Я живу в городе Санкт-Петербург, когда-то закончила
            Санкт-Петербургский Аграрный Университет.
            <br />
            Мне нравится создавать что-то полезное и видеть конченые результаты
            своей работы, поэтому я решила попробовать себя в области
            веб-разработки.
            <br />
            Свою любовь к созданию чего-то нового и полезного я часто реализую в
            hand-made проектах - от рисунков-декораций до самодельных полочек на
            стену.
          </p>
          <a
            className='about-me__github'
            href='https://github.com/Kliueva-Kath'>
            Github
          </a>
        </div>
        <img
          className='about-me__photo'
          src={photoPath}
          alt='Фото автора сайта'
        />
      </div>
    </section>
  );
}

export default AboutMe;
