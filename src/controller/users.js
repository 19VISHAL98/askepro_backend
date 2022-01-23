const { User } = require('../models/user');

<<<<<<< HEAD

=======
 const user = async (req, res) => {
     try{
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User already exists!');
    } 
    else {
        // Insert the new user if they do not exist yet
        const Hash = bcrypt.hash(req.body.password);
        user = new User({
            name: req.body.name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            password: Hash
        });
        await user.save();
        res.send(user);
    }
}
catch (e)
{
    res.json("error", e)
}
};
//---------------------------------------SHOW USER -------------------------------------
>>>>>>> 9e94cd9bc9c3ec8eef8ddd49b35f104eaffdeced
const show = async (req,res)=>{
    const all = await User.find();
    res.send(all)
}
module.exports= {show};