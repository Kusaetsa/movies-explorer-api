const moviesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regexLink } = require('../utills/regexLink');
const { createValidationErrorMessages } = require('../utills/constants');
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

// возвращает все сохраненные пользователем фильмы
moviesRouter.get('/', getSavedMovies);

// создает фильм с переданными данными
moviesRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages(createValidationErrorMessages('country')),
    director: Joi.string().required().messages(createValidationErrorMessages('director')),
    duration: Joi.number().required().messages(createValidationErrorMessages('duration')),
    year: Joi.string().required().messages(createValidationErrorMessages('year')),
    description: Joi.string().required().messages(createValidationErrorMessages('description')),
    image: Joi.string().pattern(regexLink).required().messages(createValidationErrorMessages('image')),
    trailerLink: Joi.string().pattern(regexLink).required().messages(createValidationErrorMessages('trailerLink')),
    thumbnail: Joi.string().pattern(regexLink).required().messages(createValidationErrorMessages('thumbnail')),
    movieId: Joi.number().required().messages(createValidationErrorMessages('movieId')),
    nameRU: Joi.string().required().messages(createValidationErrorMessages('nameRU')),
    nameEN: Joi.string().required().messages(createValidationErrorMessages('nameEN')),
  }),
}), createMovie);

// удаляет фильм из коллекции
moviesRouter.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required()
      .messages(createValidationErrorMessages('_id', 24)),
  }),
}), deleteMovie);

module.exports = moviesRouter;
