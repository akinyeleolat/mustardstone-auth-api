const express = require('express');
const users = require('./users');

const router = express.Router();

router.use('/auth/', users);

module.exports = router;
