const { body, query, param } = require("express-validator");
const validate = require("./validate");

const validateCreateTask = [
  body("description").notEmpty().withMessage("Description is required!"),
  validate,
];

const validateUpdateTask = [
  param("id").isMongoId().withMessage("Invalid Task ID!"),
  body("description").notEmpty().withMessage("Description is required!"),
  validate,
];

const validateDeleteTask = [
  param("id").isMongoId().withMessage("Invalid Task ID!"),
  validate,
];

const validateUpdateTaskStatus = [
  body("ids")
    .isArray({ min: 1 })
    .withMessage("IDs must be an array and cannot be empty!"),

  body("ids.*").isMongoId().withMessage("Invalid Task ID!"),

  body("status")
    .isIn(["not done", "in progress", "done"])
    .withMessage("Invalid status!"),
  validate,
];

const validateGetTask = [
  query("status")
    .optional()
    .isIn(["not done", "in progress", "done"])
    .withMessage("Invalid status!"),
  validate,
];

module.exports = {
  validateCreateTask,
  validateDeleteTask,
  validateGetTask,
  validateUpdateTask,
  validateUpdateTaskStatus,
};
