/* eslint-disable consistent-return */
const { decodeToken } = require('../helpers/authHelpers');

/**
 *  verify login user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} null
 */
function verifyUser(req, res, next) {
  let token;
  if (!req.header('authorization')) {
    return res.status(401).json({ status: 'error', message: 'Auth Error' });
  }
  try {
    const authHeader = req.header('authorization');
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7, authHeader.length);
    }
    req.user = decodeToken(token);
    next();
  } catch (error) {
    const err = new Error('Unauthorized');
    return res.status(401).json({ status: 'error', message: err.message });
  }
}
module.exports = verifyUser;
