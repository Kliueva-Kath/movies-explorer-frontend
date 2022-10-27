import React from "react";
import "./Profile.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";

function Profile() {
  return (
    <main className='profile'>
      <Header />
      <h1 className='profile__header'>Привет, Виталий!</h1>
      <form className='profile__form'>
        <div className='profile__input-container profile__name'>
          <p className='profile__input-name'>Имя</p>
          <input
            className='profile__input'
            name='name'
            placeholder='имя'
            disabled
            value='Виталий'
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
            value='pochta@yandex.ru'
            required
          />
        </div>
        <button type='button' className='profile__edit-button profile__button'>
          Редактировать
        </button>
      </form>
      <button type='button' className='profile__exit-button profile__button'>
        Выйти из аккаунта
      </button>
    </main>
  );
}

export default Profile;
