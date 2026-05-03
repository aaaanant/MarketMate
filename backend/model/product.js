const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  userEmail: String,
  mapLink: String,
  shopName: String
});

module.exports = mongoose.model("Product", productSchema);