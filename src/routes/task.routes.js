const express = require("express");

const {
  validateCreateTask,
  validateDeleteTask,
  validateGetTask,
  validateUpdateTask,
  validateUpdateTaskStatus,
} = require("../middlewares/validation.middleware");

const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/", validateCreateTask, createTask);

router.put("/:id", validateUpdateTask, updateTask);

router.delete("/:id", validateDeleteTask, deleteTask);

router.patch("/status", validateUpdateTaskStatus, updateTaskStatus);

router.get("/", validateGetTask, getTask);

module.exports = router;
