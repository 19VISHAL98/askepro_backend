const express = require('express');
<<<<<<< HEAD
const { offer, showOffer, faq, showFaq, service, showServices, deleteFaq, updateFaq, viewOffer, deleteOffer, } = require('../controller/admin');
const {login} = require('../controller/auth/login');
=======
<<<<<<< HEAD
const { offer, showOffer, faq, showFaq, } = require('../controller/admin');
const login = require('../controller/auth/login');
const register = require('../controller/auth/register');
const { show } = require('../controller/users');
=======
const { offer, showOffer, faq, showFaq, service, showServices, } = require('../controller/admin');
>>>>>>> a52864008b5528b2ec5f4728cb49e7b281117c15
const { user, show } = require('../controller/users');
>>>>>>> 9e94cd9bc9c3ec8eef8ddd49b35f104eaffdeced
const{upload } = require('../middleware/multer')

const router = express.Router();

<<<<<<< HEAD
router.post('/api/user', user)
=======
router.post('/api/register', register)
router.post('/api/offer', upload.single('image'), offer)
>>>>>>> a52864008b5528b2ec5f4728cb49e7b281117c15
router.get('/api/show',show)
router.post('/offer', upload.single('image'), offer)
router.get('/offer',showOffer)
router.post('/view/(:id)',  viewOffer)
router.delete('/offer/(:id)', deleteOffer)
router.post('/faq',faq)
router.get('/faq',showFaq)
<<<<<<< HEAD
router.delete('/faq/(:id)',deleteFaq)
router.post('/faq/(:id)',updateFaq)
=======
<<<<<<< HEAD
router.post('/login', login)
=======
>>>>>>> a52864008b5528b2ec5f4728cb49e7b281117c15
router.post('/services', upload.single('image'), service)
router.get('/showServices',showServices)
router.post('/login',login)

>>>>>>> 9e94cd9bc9c3ec8eef8ddd49b35f104eaffdeced

module.exports = router;
 
