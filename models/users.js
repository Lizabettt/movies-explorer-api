const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const AuthorizationError = require('../errors/authorizationError');

const userSchema = new mongoose.Schema({
  name: {
    default: 'User',
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Так по умолчанию хеш пароля пользователя не будет возвращаться из базы
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      // получаем объект пользователя, если почта и пароль подошли
      if (!user) {
        return Promise.reject(
          new AuthorizationError('Неправильные почта или пароль'),
        );
      }
      return bcrypt
        .compare(password, user.password) // нашёлся — сравниваем хеши
        .then((matched) => {
          if (!matched) {
            return Promise.reject(
              new AuthorizationError('Неправильные почта или пароль'),
            );
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
