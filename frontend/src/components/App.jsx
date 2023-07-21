import React from 'react';
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api.js';
import auth from '../utils/auth.js';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAuthOk, setIsAuthOk] = useState(false);
  const [isInfoToolTipOpened, setIsInfoToolTipOpened] = useState(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          api.getToken(jwt);
          setUserEmail(res.email);
          setIsLoggedIn(true);
          setCurrentUser(res);
          navigate("/");
        })
        .catch((err) => console.log(err));

      api.getInitialCards({ authorization: `Bearer ${jwt} ` })
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(err));
    }
  }, [jwt]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((arr) => arr.filter((currentCard) => currentCard._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateAvatar = (avatar) => {
    api.editProfileImage(avatar)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleAddCard = (data) => {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleRegister = (email, password) => {
    auth.register(email, password)
      .then(() => {
        setIsAuthOk(true);
        setIsLoggedIn(true);
        navigate('/sign-in');
      })
      .catch((err) => {
        setIsAuthOk(false);
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
      })
      .finally(() => setIsInfoToolTipOpened(true));
  }

  const handleAuthorize = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        setUserEmail(email);
        navigate('/');
      })
      .catch((err) => {
        setIsAuthOk(false);
        setIsInfoToolTipOpened(true);
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  }

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserEmail("");
  }

  const handleEditProfileClick = () => {
    setEditProfilePopup(true);
  }
  const handleAddPlaceClick = () => {
    setAddPlacePopup(true);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopup(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setEditProfilePopup(false);
    setAddPlacePopup(false);
    setEditAvatarPopup(false);
    setIsInfoToolTipOpened(false);
    setSelectedCard({});
  }

  useEffect(() => {
    const handleEscapeKey = (evt) => {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    const handleOverlayClick = (evt) => {
      if (evt.target.classList.contains('overlay_opened')
        || evt.target.classList.contains('close-button')) {
        closeAllPopups();
      }
    }

    document.addEventListener('mousedown', handleOverlayClick);

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <div>
                <Register
                  handleRegister={handleRegister}
                />
              </div>
            }
          />
          <Route
            path="/sign-in"
            element={
              <div>
                <Login
                  handleAuthorize={handleAuthorize}
                />
              </div>
            }
          />
          <Route
            path="*"
            element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-up' />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                }
                isLoggedIn={isLoggedIn}
              />
            }
          />

        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />

        <PopupWithForm
          name='card-delete'
          title='Вы уверенны?'
          buttonText='Да'
          onClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        ></ImagePopup>

        <InfoTooltip
          isOpen={isInfoToolTipOpened}
          onClose={closeAllPopups}
          isAuthOk={isAuthOk}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
