const signinRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createValidationErrorMessages } = require('../utills/constants');
const { login } = require('../controllers/users');

signinRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(createValidationErrorMessages('email')),
    password: Joi.string().required().messages(createValidationErrorMessages('password')),
  }),
}), login);

module.exports = signinRouter;
