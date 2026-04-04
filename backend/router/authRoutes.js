const express = require("express");
const router = express.Router();

const signupUser = require("../controller/signupController");
const loginUser = require("../controller/loginController");

// routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;