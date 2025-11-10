const mongoose=require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//reffrence to the user collection
        require:true
    },

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    status:{
        type:String,
        require:true,
        enum:{
          values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is incorrect type`
             }
         }
},{
    timestamps:true,
});

//set index 
connectionRequestSchema.index({ fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if fromuserId is same is toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot Send Connection Request to Yourself");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model(
    "Connectionrequest",connectionRequestSchema
);

module.exports=ConnectionRequestModel;