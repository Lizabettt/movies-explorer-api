const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { NotFound } = require('../errors');
const { notFoundErrorText } = require('../utils/consts');
const { signInValid, signUpValid } = require('../utils/validation');

// запрос на вход
router.post('/signin', signInValid, login);

// запрос на регистрацию
router.post('/signup', signUpValid, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.use('*', auth, (req, res, next) => {
  next(new NotFound(notFoundErrorText));
});

module.exports = router;
