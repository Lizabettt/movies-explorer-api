const movieRouter = require('express').Router();
const { createMovieValid, deleteMovieValid } = require('../utils/validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
movieRouter.get('/', getMovies);

// запрос на отправление фильма в бд
movieRouter.post('/', createMovieValid, createMovie);

// запрос на удаление фильма из бд
movieRouter.delete('/:movieId', deleteMovieValid, deleteMovie);

module.exports = movieRouter;
