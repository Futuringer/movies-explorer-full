const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const UnauthorisedError = require('../errors/unauthorised-error');
const ValidationError = require('../errors/validation-err');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => Users.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('User already exists'));
      }
      if (err.name === 'ValidationError') {
        next(new ValidationError('Invalid request parameters'));
      } else {
        next(err);
      }
    });
};

const getMyProfile = (req, res, next) => {
  const myId = req.user._id;

  Users.findById(myId)
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

const getUser = (req, res, next) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Requested user is not found');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Invalid request parameters'));
      } else {
        next(err);
      }
    });
};

const editUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const owner = req.user._id;

  Users.findByIdAndUpdate(
    owner,
    { email, name },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Requested user is not found');
      } else {
        res.status(200).send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Invalid user Id'));
      } else if (err.code === 11000) {
        next(new ConflictError('This email is already used'));
      } else if (err.name === 'ValidationError') {
        next(
          new (ValidationError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ))(),
        );
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  return Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'key');
      res
        .cookie('jwt', token, {
          maxAge: '3600000',
          httpOnly: true,
          sameSite: 'None',
          secure: true,
        })
        .end();
    })
    .catch((err) => {
      next(new UnauthorisedError(err.message));
    });
};

module.exports = {
  createUser,
  getUser,
  editUserInfo,
  login,
  getMyProfile,
};
