const { celebrate, Joi } = require('celebrate');
const { regURL } = require('./consts');

const signInValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signUpValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const createMovieValid = celebrate({
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
});

const deleteMovieValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const changeUserDataValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

module.exports = {
  signInValid,
  signUpValid,
  createMovieValid,
  deleteMovieValid,
  changeUserDataValid,
};
