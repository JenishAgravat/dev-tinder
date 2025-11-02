const adminauth=(req,res,next)=>{
    const token="abc";
    const isadminauthorized=token=="abc";

    if(!isadminauthorized){
        res.status(401).send("unauthorized admin Request");
    }
    else{
        next();
    }
}

const userauth=(req,res,next)=>{
    const token="abc";
    const isuserauthorized=token=="abc";

    if(!isuserauthorized){
        res.status(401).send("unauthorized user Request");
    }
    else{
        next();
    }
}

module.exports={
    adminauth,userauth
}