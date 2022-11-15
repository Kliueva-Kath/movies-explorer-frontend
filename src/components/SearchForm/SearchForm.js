import { useState, useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function SearchForm({ keyword, handleSearch, toggleCheckbox, isCheckboxOn }) {
  const { values, handleChange, setValues } = useFormWithValidation({});
  const [isInputEmpty, setInputEmpty] = useState(false);

  useEffect(() => {
    setValues({ keyword: keyword });
  }, [keyword, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(values.keyword);
    if (values.keyword === "") {
      setInputEmpty(true);
    } else {
      setInputEmpty(false);
    }
  }

  useEffect(() => {
    handleSearch(values.keyword);
  }, [isCheckboxOn]);

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={handleSubmit} noValidate>
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
        <span
          className={`search-form__empty-search-error ${
            isInputEmpty && "search-form__empty-search-error_visible"
          }`}>
          Нужно ввести ключевое слово
        </span>
      </form>
      <FilterCheckbox
        toggleCheckbox={toggleCheckbox}
        isCheckboxOn={isCheckboxOn}
      />
    </section>
  );
}

export default SearchForm;
