const express=require("express");

const app=express();

// app.use("/",(req,res)=>{
//     res.send("Namste Node");
// });

app.use("/hello",(req,res)=>{
    res.send("hello Node");
});

app.use("/test",(req,res)=>{
    res.send("Namste Node test");
});

app.listen(1111,()=>{
   console.log("server created successfully...");
});