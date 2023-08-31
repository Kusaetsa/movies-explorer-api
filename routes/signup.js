const signupRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser } = require('../controllers/users');
const { createValidationErrorMessages } = require('../utills/constants');

signupRouter.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages(createValidationErrorMessages('email')),
    password: Joi.string().required().messages(createValidationErrorMessages('password')),
    name: Joi.string().min(2).max(30).messages(createValidationErrorMessages('name', 2, 30)),
  }),
}), createUser);

module.exports = signupRouter;
