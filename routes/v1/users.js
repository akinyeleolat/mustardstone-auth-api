const express = require('express');

const usersSignUp = require('../../controllers/users/signup');

const router = express.Router();

router.post('/signup', usersSignUp);

module.exports = router;
