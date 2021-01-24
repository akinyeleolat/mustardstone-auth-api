const SuccessResponse = require('../../helpers/successResponse');
const BadRequestResponse = require('../../helpers/badRequestResponse');
const userSignUpService = require('../../services/users/signup');

async function signUp(req, res) {
  try {
    const result = await userSignUpService(req.body);
    new SuccessResponse('Success', result, 200).send(res);
  } catch (error) {
    new BadRequestResponse(error.message).send(res);
  }
}

module.exports = signUp;
