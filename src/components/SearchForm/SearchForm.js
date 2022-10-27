import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__form'>
        <input className='search-from__input' placeholder='Фильм' />
        <button className='search-form__button' type='submit'>
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
