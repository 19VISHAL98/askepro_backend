const express = require('express');
const { offer, showOffer, faq, showFaq, } = require('../controller/admin');
const login = require('../controller/auth/login');
const register = require('../controller/auth/register');
const { show } = require('../controller/users');
const{upload } = require('../middleware/multer')

const router = express.Router();

router.post('/api/register', register)
router.post('/api/offer', upload.single('image'), offer)
router.get('/api/show',show)
router.get('/api/showOffer',showOffer)
router.post('/faq',faq)
router.get('/faq',showFaq)
router.post('/login', login)

module.exports = router;
 
