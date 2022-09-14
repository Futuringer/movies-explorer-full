const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2),
    }),
  }),
  createUser,
);

router.get('/signout', auth, (req, res) => {
  res
    .clearCookie('jwt', {
      maxAge: '3600000',
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })
    .end();
});

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('/*', () => {
  throw new NotFoundError('The requested URL was not found');
});

module.exports = router;
