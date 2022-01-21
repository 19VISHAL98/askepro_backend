const mongoose =require('mongoose')
const path = require('path')
const {Offers} = require('../models/offer')
const {Faq} = require('../models/faq')

//-----------------------------------ADD OFFER -----------------------------------------------------------
 const offer = async(req, res )=>{
     try{
        offers = new Offers({name:req.body.name,image: req.file.path })
        await offers.save();
        res.send(offers)
     }catch(e){
         res.send("error" ,e)
     }   
 }
//------------------------------------SHOW OFFER-----------------------------------------------------------
const showOffer=async(req, res)=>{
    try{
        const offer = await Offers.find()
        res.send(offer)
        offer.forEach(image => console.log(image.image.slice(12)))
    }catch(e){
        res.send("ERROR:" , e)
    }  
}
//----------------------------------ADD FAQ ----------------------------------------------------
const faq = async(req,res)=>{
    try{
        faqs = new Faq({question:req.body.question, answer: req.body.answer});
        await faqs.save()
         res.send(faqs)
    }catch(e){
        res.send("ERROR :", e)
    }
}
//-------------------------------SHOW FAQ -----------------------------------------------\
const showFaq = async(req,res)=>{
    try{
      faqs = await Faq.find();
      res.send(faqs)
    }catch(e){
        res.send("ERROR:",e)
    }
}
<<<<<<< HEAD
//------------------------------EDIT FAQ---------------------------------------------

module.exports = {
    offer ,
    showOffer,
    faq,
    showFaq
       }
	
=======
module.exports = {offer , services}
>>>>>>> ab9e0430eb4cde284d524c58099e9e238a939b5e
