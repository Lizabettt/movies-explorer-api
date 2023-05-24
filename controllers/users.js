const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { Conflict, BadRequest, NotFound } = require('../errors');

const { JWT_SECRET, NODE_ENV } = process.env;

// создание пользователя
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    })
      .then((newUser) => res.status(201).send({
        name: newUser.name,
        email: newUser.email,
        _id: newUser._id,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(
            new Conflict('Пользователь с такими данными уже зарегистрирован'),
          );
          return;
        }
        if (err.name === 'ValidationError') {
          next(new BadRequest('Ошибка заполнения поля'));
          return;
        }
        next(err);
      });
  })
    .catch(next);
};

// вход
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET',
        {
          expiresIn: '7d', // 7 дня -это время, в течение которого токен остаётся действительным.
        },
      );
      res.send({ token }); // аутентификация успешна
    })
    .catch(next);
};

// получение моего пользователя
const getUserMy = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному _id не найден'));
        return;
      }
      res.send(user);
    })
    .catch(next);
};

// изменение данных пользователя
const changeUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному _id не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequest('Переданы некорректные данные при обновлении профиля'),
        );
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  getUserMy,
  changeUserData,
  login,
};
