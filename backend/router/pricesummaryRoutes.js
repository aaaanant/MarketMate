const express = require("express");
const router = express.Router();
const Cart = require("../model/cart");

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const cart = await Cart.findOne({
      $or: [{ owner: email }, { sharedWith: email }],
    });

    if (!cart) {
      return res.json({ total: 0 });
    }

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    res.json({ total });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error calculating total" });
  }
});

module.exports = router;