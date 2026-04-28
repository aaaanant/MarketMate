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

router.post("/invite", async (req, res) => {
  try {
    const { email, cartId } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.json({ message: "Cart not found" });

    if (!cart.sharedWith.includes(email)) {
      cart.sharedWith.push(email);
    }

    await cart.save();

    res.json({ message: "User added to cart", cart });

  } catch (err) {
    res.status(500).json({ message: "Error inviting user" });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const cart = await Cart.findOne({
      $or: [
        { owner: email },
        { sharedWith: email }
      ]
    });

    if (!cart) {
      return res.json(null);
    }

    res.json(cart);

  } catch (err) {
    res.status(500).json({ message: "Error fetching user cart" });
  }
});

module.exports = router;