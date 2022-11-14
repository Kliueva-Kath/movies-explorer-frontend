import { useEffect, useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import InfoTooltip from "../InfoTooltip/InfoTooltip.js";

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(true);

  // Попапы
  const [submitStatus, setSubmitStatus] = useState("");
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

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
        setSubmitSuccessful(false);
        setSubmitStatus("При сохранении фильма произошла ошибка.");
        setInfoTooltipOpen(true);
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
        setSubmitSuccessful(false);
        setSubmitStatus("При удалении фильма произошла ошибка.");
        setInfoTooltipOpen(true);
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
        if (err.includes("401")) {
          setSubmitStatus("Вы ввели неправильный логин или пароль.");
        } else {
          setSubmitStatus(
            "При авторизации произошла ошибка. Переданный токен некорректен."
          );
        }
        setInfoTooltipOpen(true);
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
      setLoggedIn(false);
      localStorage.clear();
    }
  }, []);

  function handleRegistration(data) {
    mainApi
      .register(data)
      .then((res) => {
        handleLogin(data);
        setSubmitSuccessful(true);
        setSubmitStatus("Вы успешно зарегистрировались.");
        setInfoTooltipOpen(true);
        history.push("/movies");
      })
      .catch((err) => {
        setSubmitSuccessful(false);
        if (err.includes("409")) {
          setSubmitStatus("Пользователь с таким email уже существует.");
        } else {
          setSubmitStatus("При обновлении профиля произошла ошибка.");
        }
        setInfoTooltipOpen(true);
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
        setSubmitStatus("Данные пользователя успешно изменены.");
        setInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitSuccessful(false);
        if (err === "Ошибка: 409") {
          setSubmitStatus("Пользователь с таким email уже существует.");
        } else {
          setSubmitStatus("При обновлении профиля произошла ошибка.");
        }
        setInfoTooltipOpen(true);
      });
  }

  // работа с попапами
  function closeAllPopups() {
    setInfoTooltipOpen(false);
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
            />
          </Route>
          <Route path='/signup'>
            <Register onRegistration={handleRegistration} />
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
          />
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          submitStatus={submitStatus}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
