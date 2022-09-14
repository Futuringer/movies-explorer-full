const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createMovie, deleteMovie, getMovies } = require('../controllers/movies');

const urlRE = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;

router.get('/movies', getMovies);
router.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required().min(2).max(100),
      director: Joi.string().required().min(2).max(100),
      duration: Joi.number().required(),
      year: Joi.string().required().min(4).max(4),
      description: Joi.string().required().min(1).max(10000),
      image: Joi.string().required().pattern(urlRE),
      trailerLink: Joi.string().required().pattern(urlRE),
      thumbnail: Joi.string().required().pattern(urlRE),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required().min(2).max(100),
      nameEN: Joi.string().required().min(2).max(100),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
