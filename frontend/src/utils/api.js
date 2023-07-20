// import { apiConfig } from "./utils";

class Api {
    constructor(options) {
        this._options = options;
    }
    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUserInfo() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._getResponse(res));
    }
    getInitialCards() {
        return fetch(`${this._options.baseUrl}/cards`, {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._getResponse(res));
    }
    editUserInfo(data) {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((res) => this._getResponse(res));
    }
    addNewCard({ name, link }) {
        return fetch(`${this._options.baseUrl}/cards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            body: JSON.stringify({
                name,
                link,
            }),
        }).then((res) => this._getResponse(res));
    }
    deleteCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._getResponse(res));
    }
    addLikeCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._getResponse(res));
    }
    deleteLikeCard(id) {
        return fetch(`${this._options.baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
        }).then((res) => this._getResponse(res));
    }
    editProfileImage(avatar) {
        return fetch(`${this._options.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
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

// const api = new Api({apiConfig});
//     // baseUrl: "http://api.katyaslanidi.mesto.nomoredomains.xyz"});
const api = new Api({
    baseUrl: "http://api.katyaslanidi.mesto.nomoredomains.xyz"
})

export default api;