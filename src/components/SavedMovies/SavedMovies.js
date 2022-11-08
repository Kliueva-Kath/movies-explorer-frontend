import { useState } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function SavedMovies({ savedMovies, isLoggedIn, onDeleteMovie }) {
  return (
    <main className='saved-movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      <MoviesCardList movies={savedMovies} onDeleteMovie={onDeleteMovie} />
      <Footer />
    </main>
  );
}

export default SavedMovies;
