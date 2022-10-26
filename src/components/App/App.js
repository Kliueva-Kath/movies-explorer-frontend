import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import initialMovies from "../../utils/initialMovies.js";

function App() {
  const history = useHistory();
  const [movies, setMovies] = useState(initialMovies);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <Route path='/movies'>
            <Movies movies={movies} />
          </Route>
          <Route path='/saved-movies'>
            <SavedMovies movies={movies} />
          </Route>
          <Route path='/profile'>
            <Profile />
          </Route>
          <Route path='/signin'>
            <Login history={history} />
          </Route>
          <Route path='/signup'>
            <Register />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
