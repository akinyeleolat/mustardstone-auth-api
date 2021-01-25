const Joi = require('joi').extend(require('@joi/date'));
const passwordComplexity = require('joi-password-complexity').default;
const errorResponse = require('../../helpers/apiError');
const validatePayload = require('../../helpers/payloadValidator');
const UserModel = require('../../models/user');
const { comparePassword, tokenGenerator } = require('../../helpers/authHelpers');

/**
 * @typedef {Object} UserData
 * @property {email} email - user email
 * @property {password} password - password
 */
const complexityOptions = {
  min: 5,
  max: 1024,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

const signUpSchema = Joi.object({
  email: Joi.string().required().email(),
  password: passwordComplexity(complexityOptions).required(),
});

/**
 * @param {UserData} data
 * @summary creates new users docs and generate token
 */
function userLogin(data) {
  const locals = {
    data,
  };

  async function servicePromiseExecutor(resolve, reject) {
    try {
      const {
        email, password,
      } = validatePayload(signUpSchema, locals.data);

      const user = await UserModel.findOne({ email });

      if (!user) {
        errorResponse.throwError('Invalid user credentials');
      }

      const { username, fullname } = user;

      const isMatch = comparePassword(user.password, password);

      if (!isMatch) {
        errorResponse.throwError('Invalid user credentials');
      }

      const userId = user.id;

      const token = tokenGenerator(userId, email);

      locals.user = {
        email,
        username,
        fullname,
        token,
      };

      resolve(locals.user);
    } catch (e) {
      errorResponse.handleError(reject, e);
    }
  }
  return new Promise(servicePromiseExecutor);
}
module.exports = userLogin;
