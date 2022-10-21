import React from "react";

function FilterCheckbox() {
  return (
    <div class='filter-checkbox'>
      <label for='toggle-button' class='filter-checkbox__label'>
        Короткометражки
      </label>
      <input
        type='checkbox'
        id='toggle-button'
        class='filter-checkbox__checkbox'
      />
    </div>
  );
}

export default FilterCheckbox;
