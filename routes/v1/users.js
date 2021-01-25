const express = require('express');

const userSignUp = require('../../controllers/users/signup');

const userLogin = require('../../controllers/users/login');
const verifyUser = require('../../middlewares/userVerification');

const getUserInfo = require('../../controllers/users/userInfo');
const updateUserBio = require('../../controllers/users/updateBio');

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);

router.use('*', verifyUser);
router.get('/info', getUserInfo);
router.patch('/bio', updateUserBio);

module.exports = router;
