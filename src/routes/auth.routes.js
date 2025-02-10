const express = require("express");

const {
  register,
  login,
  getUser,
  logout,
} = require("../controllers/auth.controller");

const {
  validateLogin,
  validateRegister,
  authenticate,
} = require("../middlewares/validationUser.middleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", authenticate, logout);

router.get("/getUser", authenticate, getUser);

module.exports = router;
