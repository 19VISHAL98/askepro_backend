const express = require('express');
const { offer, showOffer, faq, showFaq, service, showServices, deleteFaq, updateFaq, viewOffer, deleteOffer, } = require('../controller/admin');
const {login} = require('../controller/auth/login');
const{ register} = require('../controller/auth/register');
const { client, show } = require('../controller/users');
const{upload } = require('../middleware/multer')

const router = express.Router();

router.post('/client', client)
router.post('/register', register)
router.post('/api/offer', upload.single('image'), offer)
router.get('/api/show',show)
router.post('/offer', upload.single('image'), offer)
router.get('/offer',showOffer)
router.post('/view/(:id)',  viewOffer)
router.delete('/offer/(:id)', deleteOffer)
router.post('/faq',faq)
router.get('/faq',showFaq)
router.delete('/faq/(:id)',deleteFaq)
router.post('/faq/(:id)',updateFaq)
router.post('/login', login)
router.post('/services', upload.single('image'), service)
router.get('/showServices',showServices)
router.post('/login',login)


module.exports = router;
 
