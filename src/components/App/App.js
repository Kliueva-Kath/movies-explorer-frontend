import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import moviesApi from "../../utils/MoviesApi.js";
import mainApi from "../../utils/MainApi.js";
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
  /*   const [isLoggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  ); */
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(true);

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

  function handleLogin(data) {
    mainApi
      .authorize(data)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          history.push("/movies");
          localStorage.setItem("token", res.token);
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitSuccessful(false);
      });
  }

  console.log(localStorage.getItem("token"));
  console.log(isLoggedIn);
  console.log(currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err, "в проверке токена");
        });
    }
  }, []);

  function handleRegistration(data) {
    mainApi
      .register(data)
      .then((res) => {
        history.push("/signin");
      })
      .catch((err) => {
        setSubmitSuccessful(false);
      });
  }
  //TODO настроить блок .catch

  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/signin");
    console.log("logout clicked");
  }

  // получаем и устанавливаем информацию о пользователе с сервера
  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path='/'>
            <Main isLoggedIn={isLoggedIn} />
          </Route>
          <Route path='/signin'>
            <Login
              onLogin={handleLogin}
              isSubmitSuccessful={isSubmitSuccessful}
            />
          </Route>
          <Route path='/signup'>
            <Register
              onRegistration={handleRegistration}
              isSubmitSuccessful={isSubmitSuccessful}
            />
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
            onLogout={handleLogout}
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
