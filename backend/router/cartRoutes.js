const express = require("express");
const router = express.Router();
const Cart = require("../model/cart");

// ✅ CREATE CART (IMPORTANT)
router.post("/create", async (req, res) => {
  try {
    const { email } = req.body;

    const cart = new Cart({
      owner: email,
      items: [],
      sharedWith: [],
    });

    await cart.save();

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Error creating cart" });
  }
});


// ✅ INVITE FRIEND
router.post("/invite", async (req, res) => {
  try {
    const { email, cartId } = req.body;

    console.log("Incoming:", email, cartId);

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
    res.status(500).json({ message: "Error" });
  }
});


// ✅ GET CART
router.get("/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);

    if (!cart) {
      return res.json({ message: "Cart not found" });
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;