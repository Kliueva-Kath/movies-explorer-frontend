import { useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function SearchForm({ keyword, handleSearch }) {
  const { values, handleChange, setValues } = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(values.keyword);
    console.log("сабмит формы поиска фильмов");
  }

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={handleSubmit}>
        <input
          className='search-from__input'
          placeholder='Фильм'
          name='keyword'
          value={values.keyword || ""}
          onChange={handleChange}
          required
        />
        <button className='search-form__button' type='submit'>
          Найти
        </button>
      </form>
      <FilterCheckbox />
    </section>
  );
}

export default SearchForm;
