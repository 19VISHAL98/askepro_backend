const express = require('express');
const { offer, showOffer, faq, showFaq, service, showServices, deleteFaq, updateFaq, viewOffer, deleteOffer, insertQuery, showQuery, updateQuery, } = require('../controller/admin');
const {login} = require('../controller/auth/login');
// const { offer, showOffer, faq, showFaq, service, showServices, } = require('../controller/admin');
const { show } = require('../controller/users');
const{upload } = require('../middleware/multer');
const { register} = require('../controller/auth/register');

const router = express.Router();

router.post('/api/register', register)
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
router.post('/services', upload.single('image'), service)
router.get('/showServices',showServices)
router.post('/login',login)
router.post('/insertQuery', insertQuery)
router.get('/showQuery', showQuery)
router.put('/updateQuery/(:id)', updateQuery)


module.exports = router;
 
