const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const axios = require("axios");

router.post("/add", async (req, res) => {
  try {
    const { name, price, image } = req.body;

    const product = new Product({
      name,
      price,
      image,
    });

    await product.save();
    res.json(product);

  } catch (err) {
    res.status(500).json({ message: "Error adding product" });
  }
});

router.get("/dummy", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=12");
    res.json(response.data.products);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Error fetching dummy products" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;