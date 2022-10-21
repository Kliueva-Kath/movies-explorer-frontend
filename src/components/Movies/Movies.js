import React from "react";
import SearchForm from "./SearchForm/SearchForm.js";
import MoviesCardList from "./MoviesCardList/MoviesCardList.js";

function Movies() {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
