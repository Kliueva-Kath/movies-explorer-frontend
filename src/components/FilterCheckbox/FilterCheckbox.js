import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ toggleCheckbox }) {
  return (
    <div className='filter-checkbox'>
      <label htmlFor='toggle-button' className='filter-checkbox__label'>
        Короткометражки
      </label>
      <input
        type='checkbox'
        id='toggle-button'
        className='filter-checkbox__checkbox'
        onClick={toggleCheckbox}
      />
    </div>
  );
}

export default FilterCheckbox;
