const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// INVITE
router.post("/invite", async (req, res) => {
  const { email, cartId } = req.body;

  console.log(email, cartId); // debug

  const cart = await Cart.findById(cartId);

  if (!cart) {
    return res.json({ message: "Cart not found" });
  }

  if (!cart.sharedWith.includes(email)) {
    cart.sharedWith.push(email);
    await cart.save();
  }

  res.json({ message: "Invited successfully" });
});

module.exports = router;