const mongoose = require('mongoose');
const Card = require('../models/card');
// const { BadRequest, NotFound, ForbiddenError } = require('../errors/errors');
const BadRequest = require('../errors/BadRequestError');
const NotFound = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    })
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Пользователь не найден'));
      }
      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== req.user._id) {
        return next(new ForbiddenError('Это карточка другого пользователя'));
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        return next(new NotFound('Карточка уже удалена'));
      }
      res.send(deletedCard);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Пользователь не найден'));
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    })
};

module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Пользователь не найден'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    })
};