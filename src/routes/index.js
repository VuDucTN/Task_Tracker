const express = require("express");
const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");

const router = express.Router();

router.use("/auth", userRoutes);
router.use("/task", taskRoutes);

module.exports = router;
