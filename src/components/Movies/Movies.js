import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import moviesApi from "../../utils/MoviesApi.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies({ isLoggedIn, onSaveMovie, onDeleteMovie, savedMovies }) {
  const { pathname } = useLocation();
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchError, setSearchError] = useState("");
  // const [isShortMovie, setShortMovie] = useState(false);
  const [isCheckboxOn, setCheckboxOn] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      moviesApi
        .getMovies()
        .then((movies) => {
          setMovies(movies);
          //  localStorage.setItem("movies", JSON.stringify(movies));
          console.log("прошел запрос фильмов к api");
          console.log(movies, "дата с апи фильмов");
        })
        .catch((err) => {
          console.log(err);
          console.log("прошел неудачный запрос фильмов к api");
          setSearchError(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        });
    }
  }, [isLoggedIn]);
  //TODO: настроить блок .catch;

  useEffect(() => {
    if (localStorage.getItem("keyword")) {
      setKeyword(localStorage.getItem("keyword"));
    }
    if (localStorage.getItem("isCheckboxOn") === "true") {
      setCheckboxOn(true);
    }
    if (localStorage.getItem("isCheckboxOn") === "false") {
      setCheckboxOn(false);
    }
    if (localStorage.getItem("foundMovies") && !isCheckboxOn) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    }
    if (localStorage.getItem("foundShortMovies") && isCheckboxOn) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundShortMovies")));
    }

    console.log("поиск уже имеющихся настроек для поиска");
  }, [pathname === "/movies"]);

  function handleSearch(value) {
    if (value) {
      setKeyword(value);
      localStorage.setItem("keyword", value);

      const filteredMovies = movies.filter((movie) =>
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

  return (
    <main className='movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        keyword={keyword}
        handleSearch={handleSearch}
        toggleCheckbox={toggleCheckbox}
        isCheckboxOn={isCheckboxOn}
      />
      {!searchError && (
        <MoviesCardList
          movies={foundMovies}
          onDeleteMovie={onDeleteMovie}
          onSaveMovie={onSaveMovie}
          savedMovies={savedMovies}
        />
      )}
      {searchError && <p className='movies__empty-search'>{searchError}</p>}
      <Footer />
    </main>
  );
}

export default Movies;
