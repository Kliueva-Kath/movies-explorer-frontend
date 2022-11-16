import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import moviesApi from "../../utils/MoviesApi.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";
import {
  SHORT_MOVIE_DURATION,
  MOVIES_TO_RENDER_L,
  MOVIES_TO_RENDER_M,
  MOVIES_TO_RENDER_S,
  MOVIES_TO_ADD_L,
  MOVIES_TO_ADD_M_AND_S,
  WINDOW_WIDTH_CUTOFF_L,
  WINDOW_WIDTH_CUTOFF_M,
} from "../../utils/constants.js";

function Movies({ isLoggedIn, onSaveMovie, onDeleteMovie, savedMovies }) {
  const { pathname } = useLocation();
  const [foundMovies, setFoundMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isCheckboxOn, setCheckboxOn] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [renderedMovies, setRenderedMovies] = useState(foundMovies);
  const [isShowMoreButtonActive, setShowMoreButtonActive] = useState(false);
  const [isLoading, setLoading] = useState(false);

  function getMovies() {
    setLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err, "при запросе фильмов с API");
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("keyword")) {
      setKeyword(localStorage.getItem("keyword"));
    }
    if (localStorage.getItem("isCheckboxOn") === "true") {
      setCheckboxOn(true);
      setFoundMovies(JSON.parse(localStorage.getItem("foundShortMovies")));
    }
    if (localStorage.getItem("isCheckboxOn") === "false") {
      setCheckboxOn(false);
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    }
  }, [pathname === "/movies"]);

  function handleSearch(value) {
    const serverMovies = JSON.parse(localStorage.getItem("movies"));
    if (!serverMovies) {
      getMovies();
    }
    if (value) {
      setKeyword(value);
      localStorage.setItem("keyword", value);

      const filteredMovies = serverMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(value.toLowerCase())
      );
      localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
      if (filteredMovies.length !== 0) {
        setSearchError("");
        setFoundMovies(filteredMovies);
      } else {
        setSearchError("Ничего не найдено");
        setFoundMovies([]);
      }
      checkIfShortMovie(filteredMovies);

      isCheckboxOn
        ? setFoundMovies(JSON.parse(localStorage.getItem("foundShortMovies")))
        : setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    }
  }

  function checkIfShortMovie(filteredMovies) {
    if (isCheckboxOn) {
      localStorage.setItem("isCheckboxOn", "true");
      const filteredShortMovies = filteredMovies.filter((movie) => {
        return movie.duration <= SHORT_MOVIE_DURATION;
      });
      localStorage.setItem(
        "foundShortMovies",
        JSON.stringify(filteredShortMovies)
      );
      return filteredShortMovies;
    } else {
      localStorage.setItem("isCheckboxOn", "false");
      return;
    }
  }

  function toggleCheckbox() {
    setCheckboxOn(!isCheckboxOn);
  }

  // ПОКАЗ КАРТОЧЕК ПО КОЛИЧЕСТВУ
  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const updateMedia = () => {
    setTimeout(() => {
      setCurrentWidth(window.innerWidth);
    }, 4000);
  };

  function countRenderedMovies(foundMovies) {
    if (currentWidth > WINDOW_WIDTH_CUTOFF_L) {
      setRenderedMovies(foundMovies.slice(0, MOVIES_TO_RENDER_L));
    } else if (
      currentWidth > WINDOW_WIDTH_CUTOFF_M &&
      currentWidth <= WINDOW_WIDTH_CUTOFF_L
    ) {
      setRenderedMovies(foundMovies.slice(0, MOVIES_TO_RENDER_M));
    } else {
      setRenderedMovies(foundMovies.slice(0, MOVIES_TO_RENDER_S));
    }
  }

  useEffect(() => {
    if (renderedMovies.length < foundMovies.length) {
      setShowMoreButtonActive(true);
    } else {
      setShowMoreButtonActive(false);
    }
  });

  useEffect(() => {
    countRenderedMovies(foundMovies);
  }, [currentWidth, foundMovies]);

  function handleShowMoreButtonClick() {
    if (
      renderedMovies.length < foundMovies.length &&
      currentWidth > WINDOW_WIDTH_CUTOFF_L
    ) {
      setRenderedMovies(
        foundMovies.slice(0, renderedMovies.length + MOVIES_TO_ADD_L)
      );
    } else if (
      renderedMovies.length < foundMovies.length &&
      currentWidth <= WINDOW_WIDTH_CUTOFF_L
    ) {
      setRenderedMovies(
        foundMovies.slice(0, renderedMovies.length + MOVIES_TO_ADD_M_AND_S)
      );
    }
  }

  return (
    <main className='movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        keyword={keyword}
        handleSearch={handleSearch}
        toggleCheckbox={toggleCheckbox}
        isCheckboxOn={isCheckboxOn}
      />
      {isLoading && <Preloader />}
      {!searchError && (
        <MoviesCardList
          movies={renderedMovies}
          onDeleteMovie={onDeleteMovie}
          onSaveMovie={onSaveMovie}
          savedMovies={savedMovies}
        />
      )}
      {searchError && <p className='movies__empty-search'>{searchError}</p>}
      {isShowMoreButtonActive && (
        <button
          type='button'
          className='movies__show-more'
          onClick={handleShowMoreButtonClick}>
          Ещё
        </button>
      )}
      <Footer />
    </main>
  );
}

export default Movies;
