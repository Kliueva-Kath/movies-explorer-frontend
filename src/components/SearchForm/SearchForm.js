import { useEffect } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import useForm from "../../hooks/useForm.js";

function SearchForm({ keyword }) {
  const { values, handleChange, setValues } = useForm({});

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  console.log(values.keyword);

  return (
    <section className='search-form'>
      <form className='search-form__form'>
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
