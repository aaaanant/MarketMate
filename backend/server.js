require("dotenv").config({ path: __dirname + "/.env" }); // 🔥 FIXED

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./router/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

// 🔥 DEBUG (VERY IMPORTANT)
console.log("JWT_SECRET:", process.env.JWT_SECRET);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});