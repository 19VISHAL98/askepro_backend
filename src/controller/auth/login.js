const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send(`User with this email already exist`);
    } else {
      console.log(user.password)
      const password = req.body.password;
      const match = await bcrypt.compare(password, user.password);
      if(match){
        var token = jwt.sign({id:user._id, user_type:user.user_type , expiresIn: "2h"}, " process.env.SSP");
        if(token){
          return res.send({ token: token, user_type: user.user_type, id: user._id });
        }     
      }else{
        return res.status(424).send("Incorrect Password");
      }
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {login};
