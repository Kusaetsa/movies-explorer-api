const { ERROR_INTERNAL_SERVER, serverErrorMessage } = require('../utills/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_INTERNAL_SERVER;
  const message = statusCode === ERROR_INTERNAL_SERVER ? serverErrorMessage : err.message;

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
