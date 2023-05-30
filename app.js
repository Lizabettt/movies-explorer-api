require('dotenv').config(); // env-переменные из файла .env добавятся в process.env ; .env вгит игнор добавить
const helmet = require('helmet');
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const limiter = require('./utils/rateLimit');
const cors = require('./middlewares/cors');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');

const router = require('./routes');
const { PORT, MONGO_BD } = require('./utils/configuration');
const errorWithoutStatus = require('./middlewares/errorWithoutStatus');

mongoose.connect(MONGO_BD);

app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);// за ним идут все обработчики роутов
app.use(limiter);

app.get('/crash-test', () => { // до роутов, сразу после логгера
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorWithoutStatus);

app.listen(PORT, () => {
  console.log(`SERVER START. PORT => ${PORT}`);
});
