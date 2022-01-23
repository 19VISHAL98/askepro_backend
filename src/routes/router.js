const express = require('express');
<<<<<<< HEAD
const { offer, showOffer, faq, showFaq, } = require('../controller/admin');
const login = require('../controller/auth/login');
const register = require('../controller/auth/register');
const { show } = require('../controller/users');
=======
const { offer, showOffer, faq, showFaq, service, showServices, } = require('../controller/admin');
const { user, show } = require('../controller/users');
>>>>>>> 9e94cd9bc9c3ec8eef8ddd49b35f104eaffdeced
const{upload } = require('../middleware/multer')

const router = express.Router();

router.post('/api/register', register)
router.post('/api/offer', upload.single('image'), offer)
router.get('/api/show',show)
router.get('/api/showOffer',showOffer)
router.post('/faq',faq)
router.get('/faq',showFaq)
<<<<<<< HEAD
router.post('/login', login)
=======
router.post('/services', upload.single('image'), service)
router.get('/showServices',showServices)

>>>>>>> 9e94cd9bc9c3ec8eef8ddd49b35f104eaffdeced

module.exports = router;
 
