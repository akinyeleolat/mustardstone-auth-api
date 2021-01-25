const SuccessResponse = require('../../helpers/successResponse');
const BadRequestResponse = require('../../helpers/badRequestResponse');
const userLoginService = require('../../services/users/login');

async function loginUser(req, res) {
  try {
    const result = await userLoginService(req.body);
    new SuccessResponse('Login Successful', result, 200).send(res);
  } catch (error) {
    new BadRequestResponse(error.message).send(res);
  }
}

module.exports = loginUser;
