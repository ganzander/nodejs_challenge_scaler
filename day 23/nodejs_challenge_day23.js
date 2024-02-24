require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.mongoURL;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const categorySchema = new mongoose.Schema({
  name: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Category = mongoose.model("Category", categorySchema);
const Product = mongoose.model("Product", productSchema);

async function getProductsPopulatedWithCategory() {
  try {
    const products = await Product.find().populate("category").exec();
    console.log(products);
  } catch (error) {
    console.error(
      "Error while getting products with populated category:",
      error
    );
    throw error;
  }
}

getProductsPopulatedWithCategory();
