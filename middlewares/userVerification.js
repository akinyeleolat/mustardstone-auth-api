const { decodeToken } = require('../helpers/authHelpers');

/**
 *  verify login user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*} null
 */
const verifyUser = async (req, res, next) => {
  let token;
  if (!req.header('authorization')) {
    return res.status(401).json({ status: 'error', message: 'Auth Error' });
  }
  const authHeader = req.header('authorization');
  if (authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7, authHeader.length);
    const { id } = decodeToken(token);
    if (id) {
      req.userId = id;
      next();
    }
  } else {
    const err = new Error('Unauthorized');
    return res.status(401).json({ status: 'error', message: err.message });
  }
};
module.exports = verifyUser;
