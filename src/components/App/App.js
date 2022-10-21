import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";

function App() {
  const history = useHistory();

  return (
    <div className='page'>
      <Header />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
        <Route path='/saved-movies'>
          <SavedMovies />
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
      <Footer />
    </div>
  );
}

export default App;
