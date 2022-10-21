import React from "react";

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__header main__header'>О проекте</h2>
      <ul className='about-project__desc'>
        <li className='about-project__card'>
          <h3 className='about-project__card-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__card-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__card'>
          <h3 className='about-project__card-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__card-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about-project__bar'>
        <p className='about-project__bar-title about-project__bar-title_backend'>
          1 неделя
        </p>
        <p className='about-project__bar-title about-project__bar-title_frontend'>
          4 недели
        </p>
        <p className='about-project__bar-subtitle'>Back-end</p>
        <p className='about-project__bar-subtitle'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
