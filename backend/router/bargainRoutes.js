const express = require("express");
const router = express.Router();
const Bargain = require("../model/Bargain");

// CREATE
router.post("/", async (req, res) => {
  try {
    const bargain = new Bargain(req.body);
    await bargain.save();
    res.json(bargain);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BY STORE
router.get("/:storeId", async (req, res) => {
  try {
    const data = await Bargain.find({
      storeId: req.params.storeId
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;