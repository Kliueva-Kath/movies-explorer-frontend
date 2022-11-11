import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({ movies, onDeleteMovie, onSaveMovie, savedMovies }) {
  const { pathname } = useLocation();

  return (
    <section className='movies-list'>
      <ul className='movies-list__container'>
        {movies.map((movie) => {
          return (
            <MoviesCard
              movie={movie}
              id={pathname === "/movies" ? movie.id : movie.movieId}
              key={pathname === "/movies" ? movie.id : movie.movieId}
              onDeleteMovie={onDeleteMovie}
              onSaveMovie={onSaveMovie}
              savedMovies={savedMovies}
            />
          );
        })}
      </ul>
      {pathname === "/movies" && (
        <button type='button' className='movies-list__show-more'>
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;
