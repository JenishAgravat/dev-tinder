const express=require("express");
const { validatesignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter=express.Router();

authRouter.post("/signUp", async (req, res) => {
  try {
    //validation signup data
    validatesignUpData(req);
    //encrypt password
    const { firstName, lastName, emaiId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new user instance
    const user = new User({
      firstName,
      lastName,
      emaiId,
      password: passwordHash,
    });

    await user.save();
    res.send("user inserted successfully...");
  } catch (err) {
    res.status(400).send("error saving user:" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emaiId, password } = req.body;

    const user = await User.findOne({ emaiId: emaiId });
    if (!user) {
      throw new Error("invalid credtinals");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.send("login successfully...");
    } else {
      throw new Error("invalid credtinals");
    }
  } catch (err) {
    res.status(400).send("error saving user:" + err.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  })
  res.send("Logout successfull ")
});

module.exports=authRouter;