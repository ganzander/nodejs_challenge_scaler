require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.mongoURL;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const productSchema = new mongoose.Schema({
  name: { type: String, index: true },
  description: String,
  price: Number,
  quantity: Number,
});
const Product = mongoose.model("Product", productSchema);

async function getProductStatistics() {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: "$price" },
        highestQuantity: { $max: "$quantity" },
      },
    },
  ];

  try {
    const result = await Product.aggregate(pipeline);
    console.log(result[0]);
  } catch (error) {
    console.error("Error executing aggregation pipeline:", error);
  }
}

getProductStatistics();
