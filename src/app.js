const express = require("express");
const connectdb = require("./config/database");
const User = require("./models/user");
const { ReturnDocument } = require("mongodb");
const { validatesignUpData } = require("./utils/validation");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const{userAuth}=require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signUp", async (req, res) => {
  try {
    //validation signup data
    validatesignUpData(req);
    //encrypt password
    const { firstName, lastName, emaiId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new user instance
    const user = new User({
      firstName,
      lastName,
      emaiId,
      password: passwordHash,
    });

    await user.save();
    res.send("user inserted successfully...");
  } catch (err) {
    res.status(400).send("error saving user:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emaiId, password } = req.body;

    const user = await User.findOne({ emaiId: emaiId });
    if (!user) {
      throw new Error("invalid credtinals");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.send("login successfully...");
    } else {
      throw new Error("invalid credtinals");
    }
  } catch (err) {
    res.status(400).send("error saving user:" + err.message);
  }
});

app.get("/profile",userAuth, async (req, res) => {
  try {
    
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

 app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
  const user=req.user;

  res.send(user.firstName + (" sent a connection request"));
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
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

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "userId",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update Not Allow");
    }
    if (data.skills.length > 10) {
      throw new Error("skill cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed" + err.message);
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
