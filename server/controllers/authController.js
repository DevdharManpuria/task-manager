const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User created", user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // DEBUG LOG
    console.log("Signing JWT with secret:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Generated token:", token);
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
