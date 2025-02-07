const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(404).json({ error: error.array() });
  }

  next();
};

module.exports = validate;
