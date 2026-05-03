const User = require("../model/user");
const bcrypt = require("bcryptjs");

const signupUser = async (req, res) => {
  try {
    const { username, email, phone, password, role, shop } = req.body;

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
      password: hashedPassword,
      role: role || "user",
      shop: role === "shopkeeper"
        ? {
            shopName: shop?.shopName || "",
            mapLink: shop?.mapLink || ""
          }
        : undefined
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      role: newUser.role
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = signupUser;