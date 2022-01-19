
const express = require('express');
const { user } = require('../controller/users');
const router = express.Router();

router.post('/api/user', user)

module.exports = router;
 
