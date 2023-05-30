const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');
const { authorizationErrorText } = require('../utils/consts');
const { JWT } = require('../utils/configuration');

const auth = (req, res, next) => {
  const { authorization } = req.headers; // достаём авторизационный заголовок
  if (!authorization || !authorization.startsWith('Bearer ')) {
    // убеждаемся, что он есть или начинается с Bearer
    return next(new AuthorizationError(authorizationErrorText));
  }
  const token = authorization.replace('Bearer ', ''); // извлечём токен Таким образом, в переменную token запишется только JWT.
  let payload;

  try {
    payload = jwt.verify(token, JWT); // попытаемся верифицировать токен
  } catch (err) {
    return next(new AuthorizationError(authorizationErrorText)); // отправим ошибку,если не получ-сь
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
module.exports = auth;
