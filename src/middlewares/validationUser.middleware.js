const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const validate = require("./validate");

const validateRegister = [
  body("username").notEmpty().withMessage("Username is required!"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters!"),
  validate,
];

const validateLogin = [
  body("username").notEmpty().withMessage("Username is required!"),
  body("password").notEmpty().withMessage("Password is required!"),
  validate,
];

const authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied! No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired!" });
    }
    res.status(403).json({ error: "Invalid token!" });
  }
};

module.exports = { validateRegister, validateLogin, authenticate };
