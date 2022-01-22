const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send(`User with this email already exist`);
    } else {
      const password = req.body.password;
      await bcrypt.compare(User.password, password, async (err, match) => {
        if (match === true) {
          const id = User._id;
          const type = User.user_type;
          const token = await jwt.sign({ id, type }, process.env.SSP, {
            expiresIn: "2h",
          });
          return res.send({ token: token });
        } else {
          return res.status(424).send("Incorrect Password");
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
