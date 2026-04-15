const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  owner: String,
  items: [],
  sharedWith: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Cart", cartSchema);