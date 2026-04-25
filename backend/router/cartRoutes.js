const express = require("express");
const router = express.Router();
const Cart = require("../model/cart");

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

router.put("/update", async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.json({ message: "Cart not found" });

    const item = cart.items.find(i => i.productId === productId);

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Error updating cart" });
  }
});

router.delete("/remove", async (req, res) => {
  try {
    const { cartId, productId } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.productId !== productId);

    await cart.save();
    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
});

module.exports = router;