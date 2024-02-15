require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const uri = process.env.mongoURL;

function connectToMongoDB() {
  mongoose
    .connect(uri)
    .then(console.log("connection successful"))
    .catch((err) => {
      console.log("some error in db connection");
      console.log(err);
    });
}

connectToMongoDB();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
