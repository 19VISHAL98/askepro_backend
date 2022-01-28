const { User } = require('../../models/user');
const bcrypt = require('bcrypt');



 const register = async (req, res) => {
    try{
   // Check if this user already exisits
   let user = await User.findOne({ email: req.body.email });
   if (user) {
       return res.status(400).send('User already exists!');
   } 
   else {
       // Insert the new user if they do not exist yet
       const Hash = await bcrypt.hash(req.body.password , 12);
       user = new User({
           name: req.body.name,
           email: req.body.email,
           mobile_no: req.body.phone,
           password: Hash
       });
       await user.save();
        return res.status(200).json({msg:"vishalm  "});
       console.log("ok");
   }
}
catch (err)
{
   res.json(err)
}
};

module.exports = {register};