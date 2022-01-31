const { Client } = require('../models/client');
const {Document} = require('../models/Documents_Required');
const { User } = require('../models/user');

const {v4 : uuidv4} = require('uuid');
const verifyToken = require('./auth/verify');
console.log(uuidv4())
 const client = async (req, res) => {
     try{
    // console.log(req.body)
        user = new Client({
            services_id:req.body.services_id,
            category_id:req.body.category_id,
            sub_category_id:req.body.sub_category_id,
           status:"Details Pending"
            
        });  
        await user.save();
        res.send(user);
     } 
catch (e){
    console.log(e)
}
};
//------------------------------------------- client update--------------------------------------------------
const client1 = async(req , res)=>{
    try{
        client = await Client.findByIdAndUpdate(req.params.id, { 
            name: req.body.name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            location:req.body.location,
            address: req.body.address,
            dob: req.body.dob, 
            status : "Document Pending"
        })
            return res.send(client)

    }catch(err){
        return res.send(err)
    }
}
//------------------------------------------Appintenent---------------------------------------
const appintenents = async(req ,res)=>{
    try{
    appintenent = await Client.findByIdAndUpdate(req.params.id, {appointments:req.body.appointments, status:"appointments pending"})
     return res.send(appintenent)
    }catch(err){
        return res.send(err)
    }
}
//--------------------------------Document upload-------------------------------------------------------
const document = async(req , res )=>{
    try{
      Upload_document = new Document({
         document_name: req.body.document_name,
         image: req.file.path,
         client_id:req.params.id ,
         status: "Payment Pending"
          })
          await Upload_document.save()
    }catch(err){
        return res.send(err)
    }
}
//---------------------------------------------Payment------------------------------------------
const payment = async(req , res )=>{
    try{
        
        client_payment= await Client.findByIdAndUpdate(req.params.id, {
            payment_mode:req.body.payment_mode,
            Priority:req.body.Priority,
            Transaction_Id:uuidv4(),
           Amount_AED: req.body.amount,
           status:"payment ok"
        })
        return res.send(client_payment)

    }catch(err){
        return res.send(err)
    }
}
//---------------------------------------SHOW USER -------------------------------------

const showClient = async (req,res)=>{
    try{
    const all = await Client.find().select({name:1,email:1,mobile_no:1,createdAt:1 });
   return res.send(all)
    }catch(err){
        return res.send(err)
    }
};
console.log(Client);

//---------------------------------------User--------------------------------------------------------------------------

const showUser = async(req ,res)=> {
    try {
        const auth = verifyToken(req ,res);
        if(auth.user_type === "admin" || "user" ){
        const user = await User.findById(req.params.id);
        return res.json(user);
        }
        else{
            return res.json("You don't have enough permissions");
        }
    }
    catch(e){
        return res.send(e)
    };
};




module.exports= {
    client,
    client1,
    appintenents,
    document,
    payment,
    showClient,
    showUser

     };