require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const uri = process.env.mongoURL;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const productSchema = new mongoose.Schema({
  name: { type: String, index: true },
  description: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

async function createProductNameIndex() {
  try {
    await Product.collection.createIndex({ name: 1 });
    console.log('Index on "name" field created successfully.');
  } catch (error) {
    console.error("Error creating index:", error);
  }
}
createProductNameIndex();

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
