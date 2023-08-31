require('dotenv').config();
const express = require('express');

const { PORT = 3000 } = process.env;
const { DB_ADDRESS } = process.env;

const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const signup = require('./routes/signup');
const signin = require('./routes/signin');
const users = require('./routes/users');
const movies = require('./routes/movies');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkAuth } = require('./middlewares/auth');
const { notFoundErrorMessage } = require('./utills/constants');

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors({ origin: ['http://localhost:3000', 'https://ilikemovies.nomoredomainsicu.ru', 'http://ilikemovies.nomoredomainsicu.ru'], credentials: true, maxAge: 30 }));
app.use(express.json());
app.use(helmet());
app.use(requestLogger); // логирование запросов

// ограничение количества запросов за 20 минут
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// подключение незащищенных роутов
app.use('/signup', signup);
app.use('/signin', signin);
// проверка авторизации
app.use(checkAuth);
// роуты, защищенные авторизацией
app.use('/users', users);
app.use('/movies', movies);
// обработка несуществующего маршрута
app.use((req, res, next) => {
  next(new NotFoundError(notFoundErrorMessage));
});

// логирование ошибок
app.use(errorLogger);

// обработка ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение запущено на порте ${PORT}`);
});
