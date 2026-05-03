const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  shopName: String,

  mapLink: String, 

  location: {
    lat: Number,
    lng: Number,
  },

  category: String,
});

module.exports = mongoose.model("Store", storeSchema);