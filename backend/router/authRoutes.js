const express = require("express");
const router = express.Router();

const signupUser = require("../controller/signupController");
const loginUser = require("../controller/loginController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../model/user");

router.post("/signup", signupUser);
router.post("/login", loginUser);

// ✅ /me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log("ME ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;