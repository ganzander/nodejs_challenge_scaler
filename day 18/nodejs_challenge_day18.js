require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
});
const User = mongoose.model("User", UserSchema);
mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
