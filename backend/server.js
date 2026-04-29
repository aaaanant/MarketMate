require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
const productRoutes = require("./router/productRoutes");
const authRoutes = require("./router/authRoutes");
const cartRoutes = require("./router/cartRoutes");
const storeRoutes = require("./router/storeRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/products", productRoutes);
app.use("/api/store", storeRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});