//compass string connection
// mongodb+srv://jenishagravat04_db_user:Jenish0410@cluster0.6xhkldm.mongodb.net/

const mongoose=require("mongoose");

const connectdb=async()=>{
    await mongoose.connect( "mongodb+srv://jenishagravat04_db_user:Jenish0410@cluster0.6xhkldm.mongodb.net/devtinder");
    };

//     mongoose.connect(uri, {
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//         tls: true
// })
// .then(() => console.log("✅ MongoDB connected successfully"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports=connectdb;
