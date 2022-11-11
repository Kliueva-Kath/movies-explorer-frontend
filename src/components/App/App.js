import { useEffect, useState } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import "./App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";

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
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  /*   const [isLoggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  ); */
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(true);
  const [submitEditFormStatus, setSubmitEditFormStatus] = useState("");
  const [isMovieSaved, setMoviesSaved] = useState(false);
  const [authError, setAuthError] = useState("");

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

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
          console.log(movies, "сохраненные фильмы с сервера");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function handleSaveMovie(data) {
    mainApi
      .saveMovie(data)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
      })
      .catch((err) => {
        console.log(err, "ошибка при сохранении фильма");
      });
  }

  function handleDeleteMovie(movieId) {
    mainApi
      .deleteMovie(movieId)
      .then((res) => {
        setSavedMovies((state) =>
          state.filter((m) => m.id || m.movieId !== movieId)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        if (err.contains("404")) {
          setAuthError("Вы ввели неправильный логин или пароль.");
        } else if (err.contains("401")) {
          setAuthError(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате."
          );
        } else if (err.contains("403")) {
          setAuthError(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        }
      });
  }

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
            console.log("token check happened");
          }
        })
        .catch((err) => {
          console.log(err, "в проверке токена");
        });
    } else {
      localStorage.clear();
    }
  }, []);

  function handleRegistration(data) {
    mainApi
      .register(data)
      .then((res) => {
        console.log(res, "регистрация прошла");
        handleLogin(data);
        history.push("/movies");
      })
      .catch((err) => {
        setSubmitSuccessful(false);
        if (err.contains("409")) {
          setAuthError("Пользователь с таким email уже существует.");
        } else {
          setAuthError("При обновлении профиля произошла ошибка.");
        }
      });
  }
  //TODO настроить блок .catch

  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
  }

  function handleUserUpdate(values) {
    mainApi
      .editUserInfo(values)
      .then((res) => {
        setCurrentUser(res);
        setSubmitSuccessful(true);
        setSubmitEditFormStatus("Данные пользователя успешно изменены.");
      })
      .catch((err) => {
        console.log(err);
        setSubmitSuccessful(false);
        if (err === "Ошибка: 409") {
          setSubmitEditFormStatus("Пользователь с таким email уже существует.");
        } else {
          setSubmitEditFormStatus("При обновлении профиля произошла ошибка.");
        }
      });
  }

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
              authError={authError}
            />
          </Route>
          <Route path='/signup'>
            <Register
              onRegistration={handleRegistration}
              isSubmitSuccessful={isSubmitSuccessful}
              authError={authError}
            />
          </Route>
          <ProtectedRoute
            path='/movies'
            component={Movies}
            isLoggedIn={isLoggedIn}
            onSaveMovie={handleSaveMovie}
            onDeleteMovie={handleDeleteMovie}
            savedMovies={savedMovies}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
            onDeleteMovie={handleDeleteMovie}
          />
          <ProtectedRoute
            path='/profile'
            component={Profile}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onSubmit={handleUserUpdate}
            isSubmitSuccessful={isSubmitSuccessful}
            submitEditFormStatus={submitEditFormStatus}
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
