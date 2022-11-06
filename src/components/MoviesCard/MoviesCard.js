import { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
  const { pathname } = useLocation();
  const [isSaved, setSaved] = useState(false);

  function getMovieDuration(minutes) {
    if (minutes > 60) {
      return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`;
    } else if (minutes === 60) {
      return "1ч";
    } else {
      return `${minutes}мин`;
    }
  }

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
            }`}></button>
        ) : (
          <button
            type='button'
            className='movie__button movie__delete-button'></button>
        )}
      </div>
      <a
        className='movie__trailer-link'
        href={movie.trailerLink}
        target='_blank'
        rel='noopener noreferrer'>
        <img
          className='movie__image'
          src={`https://api.nomoreparties.co/${movie.image.url}`}
          alt={movie.nameRU}
        />
      </a>
    </li>
  );
}

export default MoviesCard;
