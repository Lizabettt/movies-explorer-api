require('dotenv').config(); // env-переменные из файла .env добавятся в process.env ; .env вгит игнор добавить

const express = require('express');

const app = express();
const { PORT, MONGO_BD } = require('./utils/configuration');

const mongoose = require('mongoose');
mongoose.connect(MONGO_BD);

const { errors } = require('celebrate');


const bodyParser = require('body-parser');
const cors = require('./middlewares/cors');

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(requestLogger);// за ним идут все обработчики роутов

const limiter = require('./utils/rateLimit');
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

app.listen(PORT, () => {
  console.log(`SERVER START. PORT => ${PORT}`);
});
