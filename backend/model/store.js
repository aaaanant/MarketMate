const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: String,
  address: String,

  location: {
    lat: Number,
    lng: Number,
  },

  category: String,
});

module.exports = mongoose.model("Store", storeSchema);