import React from "react";
import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function SavedMovies({ movies }) {
  return (
    <main className='saved-movies'>
      <Header />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
    </main>
  );
}

export default SavedMovies;
