const express = require("express");
const router = express.Router();
const Store = require("../model/store");

router.post("/add", async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: "Error adding store" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: "Error fetching stores" });
  }
});

module.exports = router;