const jwt = require('jsonwebtoken');
const UnauthorisedError = require('../errors/unauthorised-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new UnauthorisedError('Authorization required');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'key');
  } catch (err) {
    next(new UnauthorisedError('Authorization required'));
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
