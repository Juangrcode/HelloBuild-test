const config = require('../../config');
const boom = require('@hapi/boom');
const response = require('../response');

const withErrorStack = ({ error, message }, stack) => {
  if (config.dev) {
    return { error, message, stack };
  }

  return { error, message };
};

const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
};

const errorHandler = (err, req, res, next) => {
  const {
    output: { statusCode, payload }
  } = err;
  console.log({ err });

  response.error(
    req,
    res,
    withErrorStack(payload, err.stack),
    statusCode,
    err.details ? err.details[0] : 'Error'
  );
};

module.exports = {
  wrapErrors,
  errorHandler
};
