const express=require("express");

const app=express();

app.get("/user",(req,res,next)=>{
    const token="abc";
    const isadminauthorized=token=="abc";

    if(!isadminauthorized){
        res.status(401).send("unauthorized Request");
    }
    else{
        next();
    }
});

app.get("/user",(req,res)=>{
    res.send("Data sent ...");
});

app.use("/test",(req,res)=>{
    res.send("Namste Node test");
});

app.listen(1111,()=>{
   console.log("server created successfully...");
});