const UserModel = require('../../models/user');
const errorResponse = require('../../helpers/apiError');

/**
 * @param {UserData} data
 * @summary creates new users docs and generate token
 */
function userInfo(data) {
  const locals = {
    data,
  };

  async function servicePromiseExecutor(resolve, reject) {
    try {
      const user = await UserModel.findById(data.user.id);

      if (!user) {
        errorResponse.throwError('user info does not exist');
      }

      const {
        _id, email, username, fullname,
      } = user;

      locals.user = {
        _id,
        email,
        username,
        fullname,
      };

      resolve(locals.user);
    } catch (e) {
      errorResponse.handleError(reject, e);
    }
  }
  return new Promise(servicePromiseExecutor);
}
module.exports = userInfo;
