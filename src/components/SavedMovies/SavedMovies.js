import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function SavedMovies({ movies, isLoggedIn }) {
  return (
    <main className='saved-movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
    </main>
  );
}

export default SavedMovies;
