import React from "react";

function NavTab() {
  return (
    <ul className='nav-tab'>
      <li className='nav-tab__item'>
        <a className='nav-tab__link' href='#'>
          О проекте
        </a>
      </li>
      <li className='nav-tab__item'>
        <a className='nav-tab__link' href='#'>
          Технологии
        </a>
      </li>
      <li className='nav-tab__item'>
        <a className='nav-tab__link' href='#'>
          Студент
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
