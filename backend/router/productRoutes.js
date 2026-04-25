const express = require("express");
const router = express.Router();
const Product = require("../model/product");

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

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;