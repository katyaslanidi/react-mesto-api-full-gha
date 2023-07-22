const cardsRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
} = require('../middlewares/validation');

cardsRoutes.get('/', getCards);
cardsRoutes.post('/', createCardValidation, createCard);
cardsRoutes.delete('/:cardId', deleteCardValidation, deleteCard);
cardsRoutes.put('/:cardId/likes', likeCardValidation, likeCard);
cardsRoutes.delete('/:cardId/likes', dislikeCardValidation, dislikeCard);

module.exports = cardsRoutes;
