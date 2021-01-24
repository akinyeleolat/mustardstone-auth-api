const SuccessResponse = require('../../helpers/successResponse');
const BadRequestResponse = require('../../helpers/badRequestResponse');
const userInfoService = require('../../services/users/userInfo');

async function getUserInfo(req, res) {
  try {
    const result = await userInfoService(req.user);
    new SuccessResponse('user information retrieved', result, 200).send(res);
  } catch (error) {
    new BadRequestResponse(error.message).send(res);
  }
}

module.exports = getUserInfo;
