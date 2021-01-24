const Joi = require('joi').extend(require('@joi/date'));
const passwordComplexity = require('joi-password-complexity').default;
const errorResponse = require('../../helpers/apiError');
const validatePayload = require('../../helpers/payloadValidator');
const UserModel = require('../../models/user');
const { hashPassword, tokenGenerator } = require('../../helpers/authHelpers');

/**
 * @typedef {Object} UserData
 * @property {email} email - user email
 * @property {string} username - username
 * @property {string} fullname - full name
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
  username: Joi.string().required(),
  fullname: Joi.string().required(),
  password: passwordComplexity(complexityOptions).required(),
});

/**
 * @param {UserData} data
 * @summary creates new users docs and generate token
 */
function userSignUp(data) {
  const locals = {
    data,
  };

  async function servicePromiseExecutor(resolve, reject) {
    try {
      const {
        email, username, password, fullname,
      } = validatePayload(signUpSchema, locals.data);

      const userExist = await UserModel.findOne({ email });

      if (userExist) {
        errorResponse.throwError('User with email already exist');
      }

      const newUser = new UserModel({
        email, username, password, fullname,
      });

      newUser.password = hashPassword(password);

      await newUser.save();

      const userId = newUser.id;

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
module.exports = userSignUp;
