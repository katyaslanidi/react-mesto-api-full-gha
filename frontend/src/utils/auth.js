const BASE_URL = 'https://api.katyaslanidi.mesto.nomoredomains.xyz';

class Authorization {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`${res.status}`);
  }
  register(email, password) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),

    }).then((res) => this._getResponse(res));
  }
  authorize(email, password) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then((res) => this._getResponse(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
        }
        return data;
      });
  };
  checkToken(jwt) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    }).then((res) => this._getResponse(res));
  }
}

const auth = new Authorization(BASE_URL);
export default auth;