const express = require("express");
const router = express.Router();
const signupUser = require("../controller/signupController");
const loginUser = require("../controller/loginController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/user");
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    console.log("ME ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log("FETCH USERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;