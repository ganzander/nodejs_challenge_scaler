require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const uri = process.env.mongoURL;
const app = express();
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);

async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("Document registered successfully");
  } catch (err) {
    console.error("Error:", err.message);
  }
}
async function averageAgeOfUsers(req, res) {
  try {
    var sumAge = 0;
    const users = await User.find();
    console.log(users);
    users.map((user) => {
      sumAge = sumAge + user.age;
    });
    res.json(sumAge / users.length);
  } catch (err) {
    console.error("Error calculating average age:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

app.get("/average-age", averageAgeOfUsers);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
