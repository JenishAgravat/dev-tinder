const mongoose = require('mongoose');
const validator=require('validator');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String
    },
    emaiId:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email adddress: " + value);
            }
        }
    },
    password:{
        type:String,
        require:true,
          validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password : " + value);
            }
        }
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        lowercase:true,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        // default:"",
        //   validate(value){
        //     if(!validator.isURL(value)){
        //         throw new Error("invalid image url: " + value);
        //     }
        // }
    },
    about:{
        type:String,
        default:"this is default about user"
    },
    skills:{
        type: [String]
    },
},{timestamps:true,});

const User = mongoose.model("User",userSchema);

module.exports=User;