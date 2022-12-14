import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
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
  const [movies, setMovies] = useState(initialMovies);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/movies'>
            <Movies movies={movies} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies movies={movies} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route exact path='/signin'>
            <Login />
          </Route>
          <Route exact path='/signup'>
            <Register />
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
