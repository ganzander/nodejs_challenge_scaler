require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.mongoURL;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
async function addUserToDatabase(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("User added successfully.");
  } catch (error) {
    console.error("Error adding user:", error);
  }
}
addUserToDatabase({ username: "john_doe", email: "john@example.com" });
