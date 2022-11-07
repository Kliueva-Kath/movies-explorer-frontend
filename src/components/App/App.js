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
import initialMovies from "../../utils/initialMovies.js";

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  /*   const [isLoggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  ); */
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isSubmitSuccessful, setSubmitSuccessful] = useState(true);
  const [submitEditFormStatus, setSubmitEditFormStatus] = useState("");

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      mainApi
        .checkToken()
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
            //   history.push("/");
            console.log("token check happened");
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

  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
    console.log("logout clicked");
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
            component={Movies}
            isLoggedIn={isLoggedIn}
          />
          <ProtectedRoute
            path='/saved-movies'
            component={SavedMovies}
            isLoggedIn={isLoggedIn}
            savedMovies={savedMovies}
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
