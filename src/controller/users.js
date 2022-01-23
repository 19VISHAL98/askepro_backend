const { User } = require('../models/user');
const bcrypt = require("bcrypt")
 const user = async (req, res) => {
     try{
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User already exists!');
    } 
    else {
        // Insert the new user if they do not exist yet
        const password = req.body.password;
        const hash = await bcrypt.hash(password , 12);
       
        user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            password: hash
        });
        await user.save();
        res.send(user);
    }
}
catch (e){
    console.log(e)
}

};
//---------------------------------------SHOW USER -------------------------------------

const show = async (req,res)=>{
    const all = await User.find();
    res.send(all)
}
module.exports= {user, show};