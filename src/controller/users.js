const { User } = require('../models/user');


const show = async (req,res)=>{
    const all = await User.find();
    res.send(all)
}
module.exports= {show};