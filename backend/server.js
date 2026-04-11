require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ correct path (after fix)
const authRoutes = require("./router/authRoutes");
const cartRoutes = require("./router/cartRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/marketmate")
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});