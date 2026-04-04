const mongoose = require("mongoose");

const bargainSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },

  originalPrice: {
    type: Number,
    required: true,
  },

  offeredPrice: {
    type: Number,
    required: true,
  },

  sellerResponsePrice: {
    type: Number, // counter offer
    default: null,
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "counter"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bargain", bargainSchema);