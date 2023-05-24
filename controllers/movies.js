const Movie = require('../models/movie');
const { NotFound, BadRequest, Forbiden } = require('../errors');

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
    trailer,
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
    trailer,
    thumbnail,
    movieId,
    owner })
    .then((newMovie) => res.status(201).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при создании фильма.'),
        );
        return;
      }
      next(err);
    });
};

// получение всех фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
   // .populate(['owner', 'likes'])
    .then((movie) => res.send(movie.reverse()))
    .catch(next);
};

// удаление фильма
const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFound('Фильм с указанным _id не найден.'));
      } else {
        const owner = movie.owner.toString();
        if (req.user._id === owner) {
          Movie.deleteOne(movie).then(() => {
            res.send(movie);
          });
          return;
        }
        next(new Forbiden('Чужие фильмы удалить нельзя!'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequest('Переданы некорректные данные для удаления фильма.'),
        );
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
