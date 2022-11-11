import { useState, useEffect } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie, onDeleteMovie, onSaveMovie, savedMovies }) {
  const { pathname } = useLocation();
  const [isSaved, setSaved] = useState(false);

  function toggleSave() {
    if (isSaved) {
      deleteMovie(movie);
    } else {
      saveMovie(movie);
    }
  }

  function saveMovie(movie) {
    onSaveMovie(movie);
    setSaved(true);
    console.log(movie, "сохраненный фильм");
  }

  function deleteMovie(movie) {
    console.log(movie, "фильм перед удалением");
    pathname === "/movies"
      ? onDeleteMovie(movie.id)
      : onDeleteMovie(movie.movieId);

    setSaved(false);
  }

  function getMovieDuration(minutes) {
    if (minutes > 60) {
      return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`;
    } else if (minutes === 60) {
      return "1ч";
    } else {
      return `${minutes}мин`;
    }
  }

  useEffect(() => {
    setSaved(
      pathname === "/movies"
        ? savedMovies.some((savedMovie) => {
            return savedMovie.movieId === movie.id;
          })
        : true
    );
  }, [pathname === "/movies", "/saved-movies"]);

  /*   function checkIfSaved() {
    savedMovies.map((savedMovie) => {
      if (savedMovie.movieId === movie.id) {
        setSaved(true);
      }
    });
  }
 */
  return (
    <li className='movie'>
      <div className='movie__top-panel'>
        <div className='movie__info'>
          <h2 className='movie__name'>{movie.nameRU}</h2>
          <p className='movie__duration'>{getMovieDuration(movie.duration)}</p>
        </div>
        {pathname === "/movies" ? (
          <button
            type='button'
            className={`movie__button movie__save-button ${
              isSaved && "movie__save-button_active"
            }`}
            onClick={toggleSave}></button>
        ) : (
          <button
            type='button'
            className='movie__button movie__delete-button'
            onClick={toggleSave}></button>
        )}
      </div>
      <a
        className='movie__trailer-link'
        href={movie.trailerLink}
        target='_blank'
        rel='noopener noreferrer'>
        <img
          className='movie__image'
          src={
            pathname === "/movies"
              ? `https://api.nomoreparties.co${movie.image.url}`
              : movie.image
          }
          alt={movie.nameRU}
        />
      </a>
    </li>
  );
}

export default MoviesCard;
