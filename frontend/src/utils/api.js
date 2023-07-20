class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    getToken(jwt) {
        this._headers.authorization = `Bearer ${jwt}`;
    }
    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            credentials: "include",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            credentials: "include",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((res) => this._getResponse(res));
    }
    addNewCard({ name, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((res) => this._getResponse(res));
    }
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    addLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            credentials: "include",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    deleteLikeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            credentials: "include",
            headers: this._headers,
        }).then((res) => this._getResponse(res));
    }
    editProfileImage(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify(avatar),
        }).then((res) => this._getResponse(res));
    }
    changeLikeCardStatus(id, isLiked) {
        if (isLiked) {
            return this.addLikeCard(id);
        } else {
            return this.deleteLikeCard(id);
        }
    }
}

const api = new Api({
    baseUrl: "http://api.katyaslanidi.mesto.nomoredomains.xyz",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;