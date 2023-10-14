const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  OK, CREATED, badRequestErrorMessage, serverErrorMessage, NotFoundErrorMessage,
  forbiddenErrorMessage, movieDeleteStatusMessage,
} = require('../utills/constants');

// возвращает сохраненные пользователем фильмы
function getSavedMovies(req, res, next) {
  return Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(OK).send(movies);
    })
    .catch(next);
}

// создаёт фильм с переданными данными
function createMovie(req, res, next) {
  const movieData = { ...req.body, owner: req.user._id };
  Movie.create(movieData)
    .then((movie) => {
      res.status(CREATED).send(movie);
      console.log(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log(err);
        return next(new BadRequestError(badRequestErrorMessage));
      }
      return next(serverErrorMessage);
    });
}

// удаляет фильм из коллекции
function deleteMovie(req, res, next) {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NotFoundErrorMessage);
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError(forbiddenErrorMessage);
      }
      res.status(OK).send(movieDeleteStatusMessage);
      return Movie.findByIdAndRemove(req.params._id);
    })
    .catch(next);
}

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
