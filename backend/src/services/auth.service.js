const httpStatus = require('http-status');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} accessToken
 * @returns {Promise}
 */
const logout = async (accessToken) => {
  const accessTokenDoc = await Token.findOne({ token: accessToken, type: tokenTypes.ACCESS, blacklisted: false });
  if (!accessTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await accessTokenDoc.remove();
};

/**
 * Validate Token in DB
 * @param {string} accessToken
 * @returns {Promise}
 */
const validateDBToken = async (accessToken) => {
  const accessTokenDoc = await Token.findOne({ 
    token: accessToken, 
    type: tokenTypes.ACCESS, 
    blacklisted: false , 
    expires: {$gt : moment().toDate()}
  });
  if (!accessTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await accessTokenDoc.remove();
};


module.exports = {
  logout,
  validateDBToken,
  loginUserWithEmailAndPassword
};
