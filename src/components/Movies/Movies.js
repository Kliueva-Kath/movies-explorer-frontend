import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import moviesApi from "../../utils/MoviesApi.js";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function Movies({ isLoggedIn }) {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isShortMovie, setShortMovie] = useState(false);
  const [isCheckboxOn, setCheckboxOn] = useState(false);

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(movies);
        localStorage.setItem("movies", JSON.stringify(movies));
        console.log("прошел запрос фильмов к api");
      })
      .catch((err) => {
        console.log(err);
        setSearchError(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }, [keyword]);
  //TODO: настроить блок .catch;

  useEffect(() => {
    if (localStorage.getItem("foundMovies")) {
      setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
    }
    if (localStorage.getItem("isShortMovie") === "true") {
      setShortMovie(true);
    }
    if (localStorage.getItem("isShortMovie") === "false") {
      setShortMovie(false);
    }
    console.log("поиск уже имеющихся настроек для поиска");
  }, [location.pathname]);

  function handleSearch(value) {
    setKeyword(value);
    localStorage.setItem("keyword", value);

    /* const movies = JSON.parse(localStorage.getItem("movies")); */

    const filteredMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredMovies.length !== 0) {
      localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
      setSearchError("");
      setFoundMovies(filteredMovies);
    } else {
      setSearchError("Ничего не найдено");
    }
    checkIfShortMovie(filteredMovies);

    isCheckboxOn
      ? setFoundMovies(JSON.parse(localStorage.getItem("foundShortMovies")))
      : setFoundMovies(JSON.parse(localStorage.getItem("foundMovies")));
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
      {!searchError && <MoviesCardList movies={foundMovies} />}
      {searchError && <p className='movies__empty-search'>{searchError}</p>}
      <Footer />
    </main>
  );
}

export default Movies;
