// статус-коды
const OK = 200;
const CREATED = 201;
const ERROR_BAD_REQUEST = 400;
const ERROR_UNAUTHORIZATE = 401;
const FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const CONFLICT = 409;
const ERROR_INTERNAL_SERVER = 500;

// назначает сообщение об ошибках валидации
function createValidationErrorMessages(field, minLength, maxLength) {
  return {
    'string.empty': `Не оставляйте поле "${field}" пустым`,
    'any.required': `Поле "${field}" обязательно для заполнения`,
    'string.length': `"${field}" должно содержать ${minLength} символа`,
    'string.min': `"${field}" должно содержать более ${minLength} символов`,
    'string.max': `"${field}" должно содержать не более ${maxLength} символов`,
  };
}

// сообщения об ошибках
const unauthorizateErrorMessage = 'Ошибка авторизации';
const badRequestErrorMessage = 'Переданы некорректные данные';
const conflictErrorMessage = 'Пользователь с таким email уже существует';
const serverErrorMessage = 'Ошибка сервера';
const notFoundErrorMessage = 'Ресурс не найден';
const userNotFoundErrorMessage = 'Пользователь по указанному id не найден';
const forbiddenErrorMessage = 'Вы не можете удалять фильмы, сохраненные другими пользователями';

// сообщения о статусах 200 и 201
const userCreateStatusMessage = { message: 'Пользователь успешно создан' };
const userUpdateStatusMessage = { message: 'Данные пользователя успешно обновлены' };
const movieDeleteStatusMessage = { message: 'Фильм успешно удален из вашей коллекции' };

module.exports = {
  OK,
  CREATED,
  ERROR_BAD_REQUEST,
  ERROR_UNAUTHORIZATE,
  FORBIDDEN,
  ERROR_NOT_FOUND,
  CONFLICT,
  ERROR_INTERNAL_SERVER,
  createValidationErrorMessages,
  unauthorizateErrorMessage,
  badRequestErrorMessage,
  conflictErrorMessage,
  serverErrorMessage,
  notFoundErrorMessage,
  userNotFoundErrorMessage,
  forbiddenErrorMessage,
  userCreateStatusMessage,
  userUpdateStatusMessage,
  movieDeleteStatusMessage,
};
