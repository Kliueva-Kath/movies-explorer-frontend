import { useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function SearchForm({ keyword, handleSearch, toggleCheckbox, isCheckboxOn }) {
  const { values, handleChange, setValues } = useFormWithValidation({});

  useEffect(() => {
    setValues({ keyword: keyword });
  }, [keyword, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(values.keyword);
  }

  useEffect(() => {
    handleSearch(values.keyword);
  }, [isCheckboxOn]);

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
      <FilterCheckbox
        toggleCheckbox={toggleCheckbox}
        isCheckboxOn={isCheckboxOn}
      />
    </section>
  );
}

export default SearchForm;
