const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const envConfig = require('../config/app');

/**
 * @param {string} password
 * @return {string} hash
 */
const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * @param {string} id
 * @param {string} email
 * @param {string} tokenExpiryDate
 * @param {string} secret
 * @return {string} token
 */
const tokenGenerator = (id, email, tokenExpiryDate = '1h', secret = envConfig.secret) => {
  const payload = { id };
  if (email) {
    payload.email = email;
  }
  const token = jwt.sign(payload, secret, { expiresIn: tokenExpiryDate });
  return token;
};

/**
 * @param {string} hashPwd
 * @param {string} password
 * @return {string} hash
 */
const comparePassword = (hashPwd, password) => bcrypt.compareSync(password, hashPwd);

/**
 * @param {string} token
 * @return {object} decodeToken
 */
const decodeToken = (token) => jwt.verify(token, envConfig.secret);

module.exports = {
  tokenGenerator,
  comparePassword,
  decodeToken,
  hashPassword,
};
