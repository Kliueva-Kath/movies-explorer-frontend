import React from "react";
import "./Movies.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies({ movies, isLoggedIn }) {
  return (
    <main className='movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      <MoviesCardList movies={movies} />
      <Footer />
    </main>
  );
}

export default Movies;
