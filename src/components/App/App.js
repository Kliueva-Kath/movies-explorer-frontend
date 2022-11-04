import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import moviesApi from "../../utils/MoviesApi.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import PageNotFound from "../PageNotFound/PageNotFound.js";
import initialMovies from "../../utils/initialMovies.js";

function App() {
  const history = useHistory();
  const [movies, setMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log(err);
      });
  });
  //TODO: настроить блок .catch;

  console.log(localStorage.getItem("movies"));

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route exact path='/signin'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Register />
          </Route>
          <ProtectedRoute
            path='/movies'
            keyword={keyword}
            component={Movies}
            movies={movies}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            movies={movies}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            isLoggedIn={isLoggedIn}
          />
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
