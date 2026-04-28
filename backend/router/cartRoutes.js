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
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
});
router.post("/add", async (req, res) => {
  try {
    const { cartId, product } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) return res.json({ message: "Cart not found" });

    const existing = cart.items.find((i) => i.id == product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error adding item" });
  }
});
router.put("/update", async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;

    const cart = await Cart.findById(cartId);

    const item = cart.items.find(
      (i) => String(i.id) === String(productId)
    );

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

    cart.items = cart.items.filter(
      (i) => String(i.id) !== String(productId)
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error removing item" });
  }
});

router.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const cart = await Cart.findOne({
      $or: [{ owner: email }, { sharedWith: email }],
    });

    res.json(cart || null);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});
router.post("/invite", async (req, res) => {
  try {
    const { cartId, email } = req.body;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!cart.sharedWith.includes(email)) {
      cart.sharedWith.push(email);
    }

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error inviting user" });
  }
});

module.exports = router;