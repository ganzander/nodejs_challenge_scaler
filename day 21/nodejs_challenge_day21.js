require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.mongoURL;
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const Product = mongoose.model("Product", productSchema);

async function connectToMongoDB() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
}

async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log("Product created:", newProduct);
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log("All products:", products);
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    throw error;
  }
}
async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });
    console.log("Product updated:", product);
    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}
async function deleteProduct(productId) {
  try {
    const product = await Product.findByIdAndDelete(productId);
    console.log("Product deleted:", product);
    return product;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
async function test() {
  await connectToMongoDB();

  const product = await createProduct({
    name: "Test Product",
    price: 19.99,
    quantity: 100,
  });

  await updateProduct(product._id, { price: 29.99 });
  await deleteProduct(product._id);
  const products = await getAllProducts();
}

test();
