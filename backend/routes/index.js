const router = require('express').Router();

const auth = require('../middlewares/auth');

const registrationRouter = require('./signup');
const loginRouter = require('./signin');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const { NotFound } = require('../errors/errors');

router.use('/', registrationRouter);
router.use('/', loginRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  return next(new NotFound('Такого роута не существует'));
});

module.exports = router;