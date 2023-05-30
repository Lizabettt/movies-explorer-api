const userRouter = require('express').Router();
const { changeUserDataValid } = require('../utils/validation');

const { getUserMy, changeUserData } = require('../controllers/users');

// запрос моего пользователя
userRouter.get('/me', getUserMy);

// запрос на изменение данных пользователя
userRouter.patch('/me', changeUserDataValid, changeUserData);

module.exports = userRouter;
