const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, editUserInfo, getMyProfile } = require('../controllers/users');

router.get('/users/me', getMyProfile);

router.get(
  '/users/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  getUser,
);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email({ tlds: { allow: false } }),
    }),
  }),
  editUserInfo,
);

module.exports = router;
