import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SavedMovies.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";

function SavedMovies({ savedMovies, isLoggedIn, onDeleteMovie }) {
  const { pathname } = useLocation();
  const [foundMovies, setFoundMovies] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [isCheckboxOn, setCheckboxOn] = useState(false);

  useEffect(() => {
    setFoundMovies(savedMovies);
  }, [pathname, savedMovies]);

  function handleSearch(value) {
    if (value) {
      const filteredMovies = savedMovies.filter((movie) =>
        movie.nameRU.toLowerCase().includes(value.toLowerCase())
      );
      localStorage.setItem("foundSavedMovies", JSON.stringify(filteredMovies));
      if (filteredMovies.length !== 0) {
        setSearchError("");
        setFoundMovies(filteredMovies);
      } else {
        setSearchError("Ничего не найдено");
        setFoundMovies([]);
      }
      checkIfShortMovie(filteredMovies);

      isCheckboxOn
        ? setFoundMovies(
            JSON.parse(localStorage.getItem("foundSavedShortMovies"))
          )
        : setFoundMovies(JSON.parse(localStorage.getItem("foundSavedMovies")));
    } else {
      isCheckboxOn
        ? setFoundMovies(
            savedMovies.filter((movie) => {
              return movie.duration <= 40;
            })
          )
        : setFoundMovies(savedMovies);
    }
  }

  function checkIfShortMovie(filteredMovies) {
    if (isCheckboxOn) {
      const filteredShortMovies = filteredMovies.filter((movie) => {
        return movie.duration <= 40;
      });
      localStorage.setItem(
        "foundSavedShortMovies",
        JSON.stringify(filteredShortMovies)
      );
      console.log("checkbox toggled");
      return filteredShortMovies;
    } else {
      console.log("checkbox toggled");
      return;
    }
  }

  function toggleCheckbox() {
    setCheckboxOn(!isCheckboxOn);
  }
  return (
    <main className='saved-movies'>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm
        toggleCheckbox={toggleCheckbox}
        handleSearch={handleSearch}
        isCheckboxOn={isCheckboxOn}
      />
      {!searchError && (
        <MoviesCardList
          movies={foundMovies}
          onDeleteMovie={onDeleteMovie}
          savedMovies={savedMovies}
        />
      )}
      {searchError && <p className='movies__empty-search'>{searchError}</p>}
      <Footer />
    </main>
  );
}

export default SavedMovies;
