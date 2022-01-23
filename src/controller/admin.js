const mongoose =require('mongoose')
const path = require('path')
const {Offers} = require('../models/offer')
const {Faq} = require('../models/faq')
const {Services} = require('../models/services')
const {Category} = require('../models/category')

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
//------------------------------CREATE SERVICES---------------------------------------------
 const service = async(req,res)=>{
     try{
         servic = new Services({services_name:req.body.services_name, description:req.body.description,image: req.file.path })
         await servic.save();
         res.send(servic._id)
         let category_name = req.body.category_name;
         let arr = [];
         category_name.forEach(myFunction);
         function myFunction(item) {
         sum = new Category({category_name:item, services_id:servic._id})
        sum.save() 
         arr.push(sum);
         }
         console.log(arr)
        }catch(err){
          console.log(err)
     }
   
 }
 //------------------------------SHOW SERVICES----------------------------------------------------------
 const showServices = async(req, res)=>{
     try{
     const services = await Category.find().populate("services_id")
     res.send(services)
     }catch (e){
         res.send(e)
     }
 }
module.exports = {
    offer ,
    showOffer,
    faq,
    showFaq,
    service,
    showServices
       }
	
