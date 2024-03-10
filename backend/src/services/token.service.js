const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token } = require('../models');
const { tokenTypes } = require('../config/tokens');
const ApiError = require('../utils/ApiError');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, userRole, userCountry, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    role: userRole,
    country: userCountry,
    iat: moment().unix(),
    exp: expires,
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessTokenExpires = config.jwt.accessExpirationMinutes;
  const expiresIn = moment().add(accessTokenExpires, 'minutes');
  const accessToken = generateToken(user.id, user.role, user.country, expiresIn.unix(), tokenTypes.ACCESS);

  await saveToken(accessToken, user.id, expiresIn, tokenTypes.ACCESS);

  return {
    token: accessToken,
    expiresIn
  };
};

const decodeToken = async (token) => {
  return jwt.verify(token, config.jwt.secret, (error, decoded) => {
    if (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    } else {
      return decoded
    }
  });
}

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  decodeToken
};
