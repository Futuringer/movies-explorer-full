require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { limiter } = require('./middlewares/rateLimiter');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();
const { DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.use(limiter);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'Internal server error' : message,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening on port ${PORT}`);
});
