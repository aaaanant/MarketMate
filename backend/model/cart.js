const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
    },
  ],
  sharedWith: {
    type: [String],
    default: [], // 🔥 important
  },
});

module.exports = mongoose.model("Cart", cartSchema);