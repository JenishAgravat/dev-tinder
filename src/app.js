const express = require("express");
const connectdb = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user inserted successfully...");
  } catch (err) {
    res.status(400).send("error saving user:" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emaiId: userEmail });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something webt wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
 //const user = await User.findByIdAndDelete(_id:userId);
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

app.patch("/user", async(req,res)=>{
        const userId=req.body.userId;
        const data=req.body;
        console.log(data);
        try{
                await User.findByIdAndUpdate(userId,data);
                res.send("user updated successfully");
        }catch (err) {
    res.status(400).send("something went wrong");
  }
});

connectdb()
  .then(() => {
    console.log("connected successfully...");
    app.listen(1111, () => {
      console.log("server created successfully...");
    });
  })
  .catch((err) => {
    console.log("not connected!!!");
  });
