const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const { UnauthorizedError } = require('../errors/errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',);
  } catch (err) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  req.user = payload;
  return next();
};