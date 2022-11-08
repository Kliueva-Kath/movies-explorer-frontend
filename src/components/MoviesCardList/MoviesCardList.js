import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({ movies, onDeleteMovie, onSaveMovie, savedMovies }) {
  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              id={movie.id}
              key={movie.id}
              onDeleteMovie={onDeleteMovie}
              onSaveMovie={onSaveMovie}
              savedMovies={savedMovies}
            />
          );
        })}
      </ul>
      <button type='button' className='movies-list__show-more'>
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
