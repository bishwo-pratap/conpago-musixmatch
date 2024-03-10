const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const { tokenService } = require('../services');
const moment = require('moment');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Bearer Token missing' });
  }
  const token = authHeader.slice('Bearer '.length);
  const decodedToken = await tokenService.decodeToken(token);
  const now = moment()
  const exp = moment.unix(decodedToken.exp)
  if (now.isBefore(exp)) {
    return next()
  }
  return next(new ApiError(httpStatus.BAD_REQUEST, "Token Expired. Please Sign In Again."));
}

module.exports = {
  validate,
  validateToken
};
