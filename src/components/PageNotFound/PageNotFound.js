import React from "react";
import { useHistory } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound() {
  const history = useHistory();
  return (
    <main className='error-page'>
      <h2 className='error-page__header'>404</h2>
      <p className='error-page__desc'>Страница не найдена</p>
      <button
        type='button'
        className='error-page__return-button'
        onClick={() => history.goBack()}>
        Назад
      </button>
    </main>
  );
}

export default PageNotFound;
