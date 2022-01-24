const { Client } = require('../models/client');


 const client = async (req, res) => {
     try{
    
        user = new Client({
            services_id:123,
            category_id:344,
            sub_category_id:556,
            name: "vishal ",
            email: "vk@gmail.com",
            mobile_no: "123456789",
            location:"xyz",
            address: "add",
            dob: new Date(),   
        });  
        await user.save();
        res.send(user);
     }
         
    
catch (e){
    console.log(e)
}

};
//---------------------------------------SHOW USER -------------------------------------

const show = async (req,res)=>{
    const all = await Client.find();
    res.send(all)
}
console.log(Client)
module.exports= {client, show};