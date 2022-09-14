//beatfilm-movies API
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}
const moviesApi = new Api({
  baseUrl: " https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
