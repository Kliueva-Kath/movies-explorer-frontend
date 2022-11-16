import * as EmailValidator from "email-validator";
import { useState, useContext, useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import { nameRegExp } from "../../utils/constants.js";

function Profile({
  isLoggedIn,
  onLogout,
  onSubmit,
  isRequestOngoing,
  isEditing,
  setEditing,
}) {
  const {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    setValid,
    resetForm,
  } = useFormWithValidation({ name: "", email: "" });
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  function handleEditButtonClick() {
    setEditing(true);
  }

  useEffect(() => {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setValid(false);
    }
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit(values);
    if (!isEditing) {
      setEditing(false);
      resetForm({ name: currentUser.name, email: currentUser.email }, {}, true);
    }
  }

  return (
    <main className='profile'>
      <Header isLoggedIn={isLoggedIn} />
      <div className='profile__content'>
        <h1 className='profile__header'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__input-container profile__name'>
            <span className='profile__input-error profile__input-error_type_name'>
              {errors.name}
            </span>
            <p className='profile__input-name'>Имя</p>
            <input
              className='profile__input'
              name='name'
              placeholder='имя'
              disabled={!isEditing && "disabled"}
              onChange={handleChange}
              value={values.name || ""}
              minLength='2'
              maxLength='30'
              pattern={nameRegExp}
              required
            />
          </div>
          <div className='profile__input-container profile__email'>
            <span className='profile__input-error profile__input-error_type_email'>
              {errors.email}
            </span>
            <p className='profile__input-name'>E-mail</p>
            <input
              className='profile__input'
              type='email'
              name='email'
              placeholder='email'
              disabled={(!isEditing || isRequestOngoing) && "disabled"}
              value={values.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          {isEditing && (
            <button
              className={`profile__save-button ${
                (!isValid || isRequestOngoing) &&
                "profile__save-button_disabled"
              }`}
              type='submit'
              disabled={!isValid || isRequestOngoing}>
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
              className='profile__exit-button profile__button'
              onClick={onLogout}>
              Выйти из аккаунта
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Profile;
