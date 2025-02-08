const express = require("express");

const {
  validateCreateTask,
  validateDeleteTask,
  validateGetTask,
  validateUpdateTask,
  validateUpdateTaskStatus,
} = require("../middlewares/validationTask.middleware");

const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/task.controller");

const { authenticate } = require("../middlewares/validationUser.middleware");

const router = express.Router();

router.post("/", validateCreateTask, authenticate, createTask);

router.put("/:id", validateUpdateTask, authenticate, updateTask);

router.delete("/:id", validateDeleteTask, authenticate, deleteTask);

router.patch(
  "/status",
  validateUpdateTaskStatus,
  authenticate,
  updateTaskStatus
);

router.get("/", validateGetTask, authenticate, getTask);

module.exports = router;
