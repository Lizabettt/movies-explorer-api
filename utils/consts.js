const regURL = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

// errors
const authorizationErrorText = 'Необходима авторизация';
const badRequestErrorText = 'Переданы некорректные данные.';
const conflictErrorText = 'Пользователь с такими данными уже зарегистрирова';
const forbidenErrorText = 'Чужие фильмы удалять нельзя!';
const notFoundErrorText = 'Данные не найдены.';
const serverErrorText = 'Что-то на серверной стороне...';

module.exports = {
  regURL,
  authorizationErrorText,
  badRequestErrorText,
  conflictErrorText,
  forbidenErrorText,
  notFoundErrorText,
  serverErrorText,
};
