const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const {
  OK, CREATED, badRequestErrorMessage, conflictErrorMessage, serverErrorMessage,
  userNotFoundErrorMessage,
} = require('../utills/constants');

// регистрация пользователя
function createUser(req, res, next) {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, name, password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestErrorMessage));
      } if (err.code === 11000) {
        return next(new ConflictError(conflictErrorMessage));
      }
      return next(serverErrorMessage);
    });
}

// авторизация пользователя
function login(req, res, next) {
  const { email, password } = req.body;
  return User.findAndCheckUser(email, password)
    .then((user) => {
      const payload = { _id: user._id };
      const token = jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.status(OK).send({ token });
    })
    .catch(next);
}

// возвращает информацию о пользователе (email и имя)
function getCurrentUser(req, res, next) {
  return User.findById(req.user)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      const sendUser = {
        email: user.email,
        name: user.name,
      };
      return res.status(OK).send(sendUser);
    })
    .catch(next);
}

// обновляет информацию пользователя (email и имя)
function updateUserInfo(req, res, next) {
  const { email, name } = req.body;
  return User.findByIdAndUpdate(req.user, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(userNotFoundErrorMessage);
      }
      return res.status(OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestErrorMessage));
      } if (err.code === 11000) {
        return next(new ConflictError(conflictErrorMessage));
      }
      return next(serverErrorMessage);
    });
}

module.exports = {
  createUser, login, getCurrentUser, updateUserInfo,
};
