const express = require('express');

const userSignUp = require('../../controllers/users/signup');

const userLogin = require('../../controllers/users/login');
const verifyUser = require('../../middlewares/userVerification');

const userInfo = require('../../services/users/userInfo');

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/login', userLogin);

router.get('/info', verifyUser, userInfo);

module.exports = router;
