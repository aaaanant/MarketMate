const express = require("express");
const router = express.Router();
const Product = require("../model/product");

router.post("/add", async (req, res) => {
  try {
    const { name, price, image, userEmail, mapLink, shopName } = req.body;

    const newProduct = new Product({
      name,
      price,
      image,
      userEmail,
      mapLink,
      shopName
    });

    await newProduct.save();

    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;