import React from "react";

function NavTab() {
  return (
    <nav>
      <ul className='nav-tab'>
        <li className='nav-tab__item'>
          <a className='nav-tab__link' href='#about-project'>
            О проекте
          </a>
        </li>
        <li className='nav-tab__item'>
          <a className='nav-tab__link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='nav-tab__item'>
          <a className='nav-tab__link' href='#about-me'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavTab;
