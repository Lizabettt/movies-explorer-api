const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUserMy,
  changeUserData,
} = require('../controllers/users');

// запрос моего пользователя
userRouter.get('/me', getUserMy);

// запрос на изменение данных пользователя
userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
    }),
  }),
  changeUserData,
);

module.exports = userRouter;
