require('dotenv').config(); // env-переменные из файла .env добавятся в process.env ; .env вгит игнор добавить

const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

const { errors } = require('celebrate');

const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger);// за ним идут все обработчики роутов

//  Чтобы защититься от множества автоматических запросов
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(limiter);// подключаем rate-limiter

app.get('/crash-test', () => { // до роутов, сразу после логгера
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());

const errorWithoutStatus = require('./middlewares/errorWithoutStatus');

app.use(errorWithoutStatus);

app.listen(PORT);
