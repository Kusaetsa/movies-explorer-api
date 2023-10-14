const { ERROR_UNAUTHORIZATE } = require('../utills/constants');

class UnauthorizateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_UNAUTHORIZATE;
  }
}

module.exports = UnauthorizateError;
