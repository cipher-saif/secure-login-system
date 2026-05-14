const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Invalid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ msg: "Password must be at least 8 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Registration successful" });

  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(403).json({ msg: "Account locked. Try again in 15 minutes" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }

      await user.save();
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Reset on successful login
    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
