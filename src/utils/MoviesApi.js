class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._url, {
      method: "GET",
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "content-type": "application/json",
  },
});

export default api;
