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
  const [shortFoundMovies, setShortFoundMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isShortMovie, setShortMovie] = useState(false);
  const [isCheckboxOn, setCheckboxOn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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

    const foundMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(value.toLowerCase())
    );
    console.log(movies);
    if (foundMovies.length !== 0) {
      localStorage.setItem("foundMovies", JSON.stringify(foundMovies));
      setSearchError("");
      setFoundMovies(foundMovies);
    } else {
      setSearchError("Ничего не найдено");
    }
    if (isCheckboxOn) {
      localStorage.setItem("isShortMovie", "true");
      setFoundMovies(
        foundMovies.filter((movie) => {
          return movie.duration <= 40;
        })
      );
    } else {
      localStorage.setItem("isShortMovie", "false");
    }
    return isCheckboxOn ? shortFoundMovies : foundMovies;
  }

  function toggleCheckbox() {
    setCheckboxOn(!isCheckboxOn);
    if (!isCheckboxOn) {
      setSearchResults(shortFoundMovies);
    }
    if (isCheckboxOn) {
      setSearchResults(foundMovies);
    }
  }

  return (
    <main className='movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        keyword={keyword}
        handleSearch={handleSearch}
        toggleCheckbox={toggleCheckbox}
      />
      {!searchError && <MoviesCardList movies={foundMovies} />}
      {searchError && <p className='movies__empty-search'>{searchError}</p>}
      <Footer />
    </main>
  );
}

export default Movies;
