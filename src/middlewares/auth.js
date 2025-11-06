const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {   
      throw new Error("Token is not valid....");
    }
    const decodedobj = jwt.verify(token, "DEV@Tinder$111");

    const { _id } = decodedobj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.meessage);
  }
};

module.exports = {
  userAuth,
};
