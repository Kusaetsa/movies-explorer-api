const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizateError = require('../errors/UnauthorizateError');
const { unauthorizateErrorMessage } = require('../utills/constants');

function checkAuth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizateError(unauthorizateErrorMessage);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizateError(unauthorizateErrorMessage);
  }

  req.user = payload;
  return next();
}

module.exports = {
  checkAuth,
};
