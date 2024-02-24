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
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);

app.post("/products", async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = new Product({
      name,
      description,
      price,
    });
    await product.save();
    console.log("Product saved");
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    console.log("Product updated");
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    console.log("Product deleted");
    res.status(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
