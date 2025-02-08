const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    description: { type: String, require: true },
    status: {
      type: String,
      enum: ["not done", "in progress", "done"],
      default: "not done",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
