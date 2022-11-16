import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import moviesApi from "../../utils/MoviesApi.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader.js";

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
    try {
      if (value) {
        setKeyword(value);
        localStorage.setItem("keyword", value);
        const serverMovies = JSON.parse(localStorage.getItem("movies"));

        if (!serverMovies) {
          getMovies();
        }
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
    } catch (err) {
      setSearchError(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
    }
  }

  function checkIfShortMovie(filteredMovies) {
    if (isCheckboxOn) {
      localStorage.setItem("isCheckboxOn", "true");
      const filteredShortMovies = filteredMovies.filter((movie) => {
        return movie.duration <= 40;
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
    if (currentWidth > 1210) {
      setRenderedMovies(foundMovies.slice(0, 12));
    } else if (currentWidth > 767 && currentWidth <= 1210) {
      setRenderedMovies(foundMovies.slice(0, 8));
    } else {
      setRenderedMovies(foundMovies.slice(0, 5));
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
    if (renderedMovies.length < foundMovies.length && currentWidth > 1210) {
      setRenderedMovies(foundMovies.slice(0, renderedMovies.length + 3));
    } else if (
      renderedMovies.length < foundMovies.length &&
      currentWidth <= 1210
    ) {
      setRenderedMovies(foundMovies.slice(0, renderedMovies.length + 2));
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
