const User = require("../model/user");
const bcrypt = require("bcryptjs");

const signupUser = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (err) {
    console.log("ERROR 👉", err);
    res.status(500).json({
      message: "Error",
      error: err.message
    });
  }
};

module.exports = signupUser;