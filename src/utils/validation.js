const validator=require("validator");

const validatesignUpData=(req)=>{
    const{firstName,lastName,emaiId,password }=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emaiId)){
        throw new Error("Email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Passwore is not strong");
    }
};

const validateEditProfileData=(req)=>{
    const alloeEditFields=["firstName","lastName","emiId","photoUel","gender","age","skills"];

    const isEditAllowed=Object.keys(req.body).every(field=>alloeEditFields.includes(field));

    return isEditAllowed;
}

module.exports={
    validatesignUpData,
};