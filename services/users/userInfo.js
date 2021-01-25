const UserModel = require('../../models/user');
const errorResponse = require('../../helpers/apiError');

/**
 * @param {UserData} data
 * @summary get users info
 */
function userInfoService(data) {
  const locals = {
    data,
  };

  async function servicePromiseExecutor(resolve, reject) {
    try {
      const { user } = locals.data;
      const { id } = user;
      const userInfo = await UserModel.findById(id);

      if (!userInfo) {
        errorResponse.throwError('user info does not exist');
      }

      const {
        _id, email, username, fullname, bio, createdAt,
      } = userInfo;

      locals.user = {
        _id,
        email,
        username,
        fullname,
        bio,
        createdAt,
      };

      resolve(locals.user);
    } catch (e) {
      errorResponse.handleError(reject, e);
    }
  }
  return new Promise(servicePromiseExecutor);
}
module.exports = userInfoService;
