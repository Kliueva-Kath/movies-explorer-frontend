import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";

function SearchForm({ keyword, handleSearch, toggleCheckbox }) {
  const location = useLocation();
  const { values, handleChange, setValues } = useFormWithValidation({});

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSearch(values.keyword);
    console.log("сабмит формы поиска фильмов");
  }

  console.log(localStorage.getItem("isShortMovie"));
  console.log(localStorage.getItem("foundMovies"));
  console.log(localStorage.getItem("shortFoundMovies"));

  useEffect(() => {
    if (keyword) {
      setValues(keyword);
    }
  }, [location.pathname]);

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
      <FilterCheckbox toggleCheckbox={toggleCheckbox} />
    </section>
  );
}

export default SearchForm;
