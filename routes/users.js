const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line
const regURL = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;
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
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  changeUserData,
);

module.exports = userRouter;
