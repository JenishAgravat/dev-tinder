const express=require("express");
const{userAuth}=require("../middlewares/auth");
const { validate } = require("../models/user");
const profileRouter=express.Router();


profileRouter.get("/profile/view",userAuth, async (req, res) => {
  try {  
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("profile/edit", userAuth, async(req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request");
    }
  }catch(err){
    res.status(400).send("ERROR: "+err.message)
  }
})

module.exports=profileRouter;