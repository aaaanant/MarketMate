const express = require("express");
const router = express.Router();

// ✅ correct path (your structure)
const Cart = require("../model/cart");

router.post("/invite", async (req, res) => {
  try {
    const { email, cartId } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.json({ message: "Cart not found" });
    }

    if (!cart.sharedWith.includes(email)) {
      cart.sharedWith.push(email);
      await cart.save();
    }

    res.json({ message: "Invited successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;