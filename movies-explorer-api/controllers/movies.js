const Movies = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-err');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movies.find({ owner })
    .then((movies) => res.status(200).send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Invalid request parameters'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  Movies.findById(id)
    .orFail(() => {
      throw new NotFoundError('Requested movie is not found');
    })
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError("You can't delere other users' Movies");
      }
      Movies.findByIdAndRemove(id)
        .then((movieToDelete) => res.send(movieToDelete))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Invalid request parameters'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovies,
};
