require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.mongoURL;
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});
const User = mongoose.model("User", userSchema);
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function addUserWithValidation(user) {
  try {
    const newUser = new User(user);
    await newUser.save();
    console.log("Document registered successfully");
  } catch (err) {
    console.error("Error:", err.message);
  }
}
addUserWithValidation({ username: "john_doe", email: "invalid-email" });
