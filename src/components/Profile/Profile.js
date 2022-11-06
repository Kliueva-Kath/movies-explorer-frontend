import { useState, useContext } from "react";
import "./Profile.css";
import Header from "../Header/Header.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Profile({ isLoggedIn, onLogout }) {
  const [isEditing, setEditing] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  function handleEditButtonClick() {
    setEditing(true);
  }

  return (
    <main className='profile'>
      <Header isLoggedIn={isLoggedIn} />
      <div className='profile__content'>
        <h1 className='profile__header'>Привет, {currentUser.name}!</h1>
        <form className='profile__form'>
          <div className='profile__input-container profile__name'>
            <p className='profile__input-name'>Имя</p>
            <input
              className='profile__input'
              name='name'
              placeholder='имя'
              disabled
              value={currentUser.name}
            />
          </div>
          <div className='profile__input-container profile__email'>
            <p className='profile__input-name'>E-mail</p>
            <input
              className='profile__input'
              type='email'
              name='email'
              placeholder='email'
              disabled
              value={currentUser.email}
              required
            />
          </div>
          {isEditing && (
            <button className='profile__save-button' type='submit'>
              Сохранить
            </button>
          )}
        </form>
        {!isEditing && (
          <>
            <button
              type='button'
              className='profile__edit-button profile__button'
              onClick={handleEditButtonClick}>
              Редактировать
            </button>
            <button
              type='button'
              className='profile__exit-button profile__button'>
              Выйти из аккаунта
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Profile;
