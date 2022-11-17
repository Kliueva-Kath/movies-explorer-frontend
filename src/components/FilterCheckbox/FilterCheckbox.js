import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ toggleCheckbox, isCheckboxOn }) {
  return (
    <div className='filter-checkbox'>
      <label htmlFor='toggle-button' className='filter-checkbox__label'>
        Короткометражки
      </label>
      <input
        type='checkbox'
        id='toggle-button'
        className='filter-checkbox__checkbox'
        checked={isCheckboxOn}
        onChange={toggleCheckbox}
      />
    </div>
  );
}

export default FilterCheckbox;
