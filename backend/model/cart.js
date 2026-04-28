const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  owner: String,

  items: [
    {
      id: {
        type: String,
        required: true,
      },
      title: String,
      price: Number,
      image: String,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  sharedWith: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Cart", cartSchema);