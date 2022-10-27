import React from "react";
import "./SavedMovies.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function SavedMovies({ movies }) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {movies.map((movie) => {
          return <MoviesCard movie={movie} id={movie._id} />;
        })}
      </ul>
      <button type='button' className='movies-list__show-more'>
        Ещё
      </button>
    </section>
  );
}

export default SavedMovies;
