const express=require("express");

const app=express();



app.use("/error",(req,res)=>{
    try{
            throw new error("asdssg");
            
    }
    catch(err){
            res.status(500).send("something went worng....");
    }
});



app.listen(1111,()=>{
   console.log("server created successfully...");
});