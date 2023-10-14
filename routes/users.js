const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createValidationErrorMessages } = require('../utills/constants');
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getCurrentUser);

// обновляет информацию пользователя (email и имя)
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(createValidationErrorMessages('email')),
    name: Joi.string().min(2).max(30).messages(createValidationErrorMessages('name', 2, 30)),
  }),
}), updateUserInfo);

module.exports = userRouter;
