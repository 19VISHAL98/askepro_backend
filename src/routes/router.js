
const express = require('express');
const { offer, services } = require('../controller/admin');
const { user, show } = require('../controller/users');

const router = express.Router();

router.post('/api/user', user)
router.post('/api/offer', offer)
router.get('/api/show',show)
router.get('/api/services',services)


module.exports = router;
 
