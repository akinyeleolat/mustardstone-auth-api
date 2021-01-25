const Joi = require('joi').extend(require('@joi/date'));
const errorResponse = require('../../helpers/apiError');
const validatePayload = require('../../helpers/payloadValidator');
const UserModel = require('../../models/user');

/**
 * @typedef {Object} UserData
 * @property {string} fullname - full name
 * @property {string} bio - bio
 */

const updateSchema = Joi.object({
  fullname: Joi.string().required(),
  bio: Joi.string().required(),
});

/**
 * @param {UserData} data
 * @summary updates user bio
 */
function updateUserBio(data) {
  const locals = {
    data,
  };

  async function servicePromiseExecutor(resolve, reject) {
    try {
      const {
        bio, fullname,
      } = validatePayload(updateSchema, locals.data);

      const { id } = locals.data.user;

      const userInfo = await UserModel.findById(id);

      if (!userInfo) {
        errorResponse.throwError('user info does not exist');
      }

      const results = await UserModel.findByIdAndUpdate(id, {
        fullname,
        bio,
      });

      locals.user = {
        _id: results._id,
        email: results.email,
        fullname: results.fullname,
        bio: results.bio,
        createdAt: results.createdAt,
      };

      resolve(locals.user);
    } catch (e) {
      errorResponse.handleError(reject, e);
    }
  }
  return new Promise(servicePromiseExecutor);
}
module.exports = updateUserBio;
