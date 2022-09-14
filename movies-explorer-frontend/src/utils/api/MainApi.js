//НАШ API
class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  register(data) {
    return fetch(`${this._baseUrl}/signup`, {
      headers: this._headers,
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        password: data.password,
        email: data.email,
      }),
    }).then((res) => this._handleRegisterResponse(res));
  }

  getMyInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  changeMyInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        password: data.password,
        email: data.email,
      }),
    }).then((res) => this._handleRegisterResponse(res));
  }

  login(data) {
    return fetch(`${this._baseUrl}/signin`, {
      headers: this._headers,
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        password: data?.password,
        email: data?.email,
      }),
    }).then((res) => this._handleLoginResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._handleResponse(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => this._handleResponse(res));
  }

  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(movie),
    }).then((res) => this._handleResponse(res));
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }


  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _handleLoginResponse(res) {
    if (res.ok) {
      return res.text();
    }
    return res.json().then(res => {
      throw (JSON.stringify(res.message))
    })
  }

  _handleRegisterResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.json().then(res => {
      throw (JSON.stringify(res.message))
    })
  }

}
const api = new Api({
  baseUrl: 'https://api.futuringer-movies.nomoredomains.work',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;