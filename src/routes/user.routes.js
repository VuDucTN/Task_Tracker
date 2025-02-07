const express = require("express");

const { register, login, getUser } = require("../controllers/user.controller");

const {
  validateLogin,
  validateRegister,
  authenticate,
} = require("../middlewares/validationUser.middleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

router.get("/getUser", authenticate, getUser);

module.exports = router;
