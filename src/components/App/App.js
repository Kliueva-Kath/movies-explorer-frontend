import { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useHistory,
  Redirect,
  useLocation,
} from "react-router-dom";
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
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(true);
  // проверка, находится ли форма в стадии выполнения запроса к api
  const [isRequestOngoing, setRequestOngoing] = useState(false);
  const [isProfileEditing, setProfileEditing] = useState(false);

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
          console.log(err, "при запросе данных пользователя");
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch((err) => {
          console.log(err, "при запросе сохраненных фильмов");
        });
    }
  }, [isLoggedIn]);

  function handleSaveMovie(data) {
    mainApi
      .saveMovie(data)
      .then((movie) => {
        setSavedMovies([...savedMovies, movie]);
        console.log("прошло сохранение");
      })
      .catch((err) => {
        setSubmitSuccessful(false);
        if (err.includes("401")) {
          handleLogout();
        } else {
          setSubmitStatus("При сохранении фильма произошла ошибка.");
          setInfoTooltipOpen(true);
        }
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
          localStorage.setItem("loggedIn", true);
        }
      })
      .catch((err) => {
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
    const token = localStorage.getItem("loggedIn");
    if (token) {
      mainApi
        .checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            history.replace(location);
          }
        })
        .catch((err) => {
          console.log(err, "в проверке токена");
          handleLogout();
        });
    } else {
      handleLogout();
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
          setSubmitStatus("При регистрации пользователя произошла ошибка.");
        }
        setInfoTooltipOpen(true);
      });
  }
  //TODO настроить блок .catch

  function handleLogout() {
    console.log("logout сработал");
    mainApi
      .logout()
      .then((res) => {
        localStorage.clear();
        setLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err, "при выходе из профиля");
      });
  }

  function handleUserUpdate(values) {
    setRequestOngoing(true);
    mainApi
      .editUserInfo(values)
      .then((res) => {
        setCurrentUser(res);
        setSubmitSuccessful(true);
        setSubmitStatus("Данные пользователя успешно изменены.");
        setInfoTooltipOpen(true);
        setProfileEditing(false);
      })
      .catch((err) => {
        setSubmitSuccessful(false);
        if (err === "Ошибка: 409") {
          setSubmitStatus("Пользователь с таким email уже существует.");
        } else {
          setSubmitStatus("При обновлении профиля произошла ошибка.");
        }
        setInfoTooltipOpen(true);
      })
      .finally(() => {
        setRequestOngoing(false);
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
            {isLoggedIn ? (
              <Redirect to='./' />
            ) : (
              <Login
                onLogin={handleLogin}
                isSubmitSuccessful={isSubmitSuccessful}
              />
            )}
          </Route>
          <Route path='/signup'>
            {isLoggedIn ? (
              <Redirect to='./' />
            ) : (
              <Register onRegistration={handleRegistration} />
            )}
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
            isEditing={isProfileEditing}
            setEditing={setProfileEditing}
            isRequestOngoing={isRequestOngoing}
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
