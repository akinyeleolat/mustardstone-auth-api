const SuccessResponse = require('../../helpers/successResponse');
const BadRequestResponse = require('../../helpers/badRequestResponse');
const userUpdateBioService = require('../../services/users/updateBio');

async function updateUserBio(req, res) {
  try {
    const userData = req.body;
    userData.user = req.user;
    const result = await userUpdateBioService(userData);
    new SuccessResponse('user bio information updated', result, 200).send(res);
  } catch (error) {
    new BadRequestResponse(error.message).send(res);
  }
}

module.exports = updateUserBio;
