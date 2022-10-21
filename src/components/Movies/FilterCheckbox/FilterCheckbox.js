import React from "react";

function FilterCheckbox() {
  return (
    <div className='filter-checkbox'>
      <label htmlFor='toggle-button' className='filter-checkbox__label'>
        Короткометражки
      </label>
      <input
        type='checkbox'
        id='toggle-button'
        className='filter-checkbox__checkbox'
      />
    </div>
  );
}

export default FilterCheckbox;
