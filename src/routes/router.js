
const express = require('express');
const { offer, showOffer, faq, showFaq, } = require('../controller/admin');
const { user, show } = require('../controller/users');
const{upload } = require('../middleware/multer')

const router = express.Router();

router.post('/api/user', user)
router.post('/api/offer', upload.single('image'), offer)
router.get('/api/show',show)
router.get('/api/showOffer',showOffer)
router.post('/faq',faq)
router.get('/faq',showFaq)


module.exports = router;
 
