const express = require('express');
const { offer, showOffer, faq, showFaq, service, showServices, deleteFaq, updateFaq, viewOffer, deleteOffer, insertQuery, showQuery, updateQuery, showClients, viewDetails, showCategory, showSubCategory, manageApplication, OneApplication, deleteServices, appointement, } = require('../controller/admin');
const {login} = require('../controller/auth/login');
const{ register} = require('../controller/auth/register');
const { client,  client1, appintenents , document, payment, showClient} = require('../controller/users');
const{upload } = require('../middleware/multer')

const router = express.Router();


router.post('/register', register)
router.post('/api/offer', upload.single('image'), offer)
router.get('/showClient',showClient)
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
router.post('/insertQuery', insertQuery)
router.get('/showQuery', showQuery)
router.put('/updateQuery/(:id)', updateQuery)
router.get('/showClients', showClients)
router.get('/viewDetails', viewDetails)
router.post('/client', client)
router.put('/client/(:id)', client1)
router.put('/appintenent/(:id)', appintenents),  
router.post('/uploadDocument/(:id)', upload.single('image'), document ) 
router.put('/payment/(:id)', payment)
router.get('/category/(:id)', showCategory)
router.get('/subCategory/(:id)', showSubCategory)
router.get('/manageApplication', manageApplication)
router.get('/oneApplication/(:id)',OneApplication)
router.delete('/services/(:id)', deleteServices)
router.get('/appointement', appointement)
module.exports = router;
