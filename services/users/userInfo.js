const errorResponse = require('../../helpers/apiError');
const UserModel = require('../../models/user');

/**
 * @param {UserData} data
 * @summary get current user info
 */
function userInfo(data) {
  const locals = {
    data,
  };

  async function servicePromiseExecutor(resolve, reject) {
    try {
      const user = await UserModel.findById(data.userId);

      if (!user) {
        errorResponse.throwError('user info does not exist');
      }

      const {
        _id, email, username, fullname,
      } = user;

      locals.userInfo = {
        _id,
        email,
        username,
        fullname,
      };

      resolve(locals.userInfo);
    } catch (e) {
      errorResponse.handleError(reject, e);
    }
  }
  return new Promise(servicePromiseExecutor);
}
module.exports = userInfo;
