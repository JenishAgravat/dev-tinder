const express=require("express");
const connectdb= require("./config/database");
const User=require("./models/user");
const app=express();

app.post("/signUp", async(req,res)=>{
        const user=new User({
                firstName:"jenish",
                lastName:"agravat",
                emaiId:"jenish@gmail.com",
                password:"jenish1234"
        });
        try{
        await user.save();
        res.send("user inserted successfully...")
        }catch(err){
                res.status(400).send("error saving user:"+err.message)
        }
});

connectdb().then(()=>{
    console.log("connected successfully...");   
    app.listen(1111,()=>{
   console.log("server created successfully...");
});
})
.catch((err)=>{
    console.log("not connected!!!")
})

