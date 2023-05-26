const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regURL = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/', getMovies);

// запрос на отправление фильма в бд
movieRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      trailerLink: Joi.string().required().regex(regURL).required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(regURL).required(),
      thumbnail: Joi.string().required().regex(regURL).required(),
      movieId: Joi.number().required(),
    }),
  }),
  createMovie,
);

// запрос на удаление фильма из бд
movieRouter.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }),
  }),
  deleteMovie,
);

module.exports = movieRouter;
