import React from "react";

function MoviesCard({ movie }) {
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
          <h2 className='movie__name'>{movie.nameRu}</h2>
          <p className='movie__duration'>{getMovieDuration(movie.duration)}</p>
        </div>
        <button type='button' className='movie__save-button'></button>
      </div>
      <img className='movie__image' src={movie.image} alt='обложка фильма' />
    </li>
  );
}

export default MoviesCard;
