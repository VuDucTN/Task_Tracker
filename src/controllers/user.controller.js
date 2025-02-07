const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generate = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    res
      .status(201)
      .json({ message: "User registered successfully!", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password is wrong!" });
    }

    const token = generate(user);
    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Invalid User!" });
  }
};

module.exports = { register, login, getUser };
