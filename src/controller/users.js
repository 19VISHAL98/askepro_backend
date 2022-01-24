const { Client } = require('../models/client');
 const client = async (req, res) => {
     try{
     console.log(req.body)
        user = new Client({
            services_id:req.body.services_id,
            category_id:req.body.category_id
            // sub_category_id:556,
            
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
        })
            return res.send(client)

    }catch(err){
        return res.send(err)
    }
}
//---------------------------------------SHOW USER -------------------------------------

const show = async (req,res)=>{
    const all = await Client.find();
    res.send(all)
}
console.log(Client)
module.exports= {
    client,
    client1,
     show
     };