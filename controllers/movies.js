const Movie = require('../models/movie');
const { NotFound, BadRequest, Forbiden } = require('../errors');
const {
  notFoundErrorText,
  forbidenErrorText,
  badRequestErrorText,
} = require('../utils/consts');

// создание фильма
const createMovie = (req, res, next) => {
  const {
    nameRU,
    nameEN,
    trailerLink,
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  return Movie.create({
    nameRU,
    nameEN,
    trailerLink,
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    movieId,
    owner,
  })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(badRequestErrorText));
        return;
      }
      next(err);
    });
};

// получение всех фильмов текущего пользователя
const getMovies = (req, res, next) => {
  Movie.find({
    owner: req.user._id
  })
    .then((movie) => res.send(movie.reverse()))
    .catch(next);
};

// удаление фильма
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFound(notFoundErrorText));
      } else {
        const owner = movie.owner.toString();
        if (req.user._id === owner) {
          Movie.deleteOne(movie).then(() => {
            res.send(movie);
          });
          return;
        }
        next(new Forbiden(forbidenErrorText));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(badRequestErrorText));
        return;
      }
      next(err);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
