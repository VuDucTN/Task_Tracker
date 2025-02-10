const Task = require("../models/task.model");

const getTask = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = { createdBy: req.user.userId };
    if (status) {
      filter.status = status;
    }
    const tasks = await Task.find(filter).populate("createdBy", "username");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { description } = req.body;

    const newTask = await Task.create({
      description,
      createdBy: req.user.userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTask = await Task.findOneAndUpdate(
      { _id: id, createdBy: req.user.userId },
      {
        description,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updateTask) {
      return res
        .status(404)
        .json({ error: "Task not found or you don't have permission!" });
    }

    res.json(updateTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({
      _id: id,
      createdBy: req.user.userId,
    });

    if (!task) {
      return res
        .status(403)
        .json({ error: "Task not found or you don't have permission!" });
    }

    res.json({ message: `Task ${id} deleted!` });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { ids, status } = req.body;
    const notFoundIDs = [];

    for (const id of ids) {
      const findIdTask = await Task.findById(id);

      if (!findIdTask) {
        notFoundIDs.push(id);
      }
    }

    const updatedTasks = await Task.updateMany(
      { _id: { $in: ids } },
      { status, updatedAt: new Date() }
    );

    res.json({
      message: `✅ Updated ${updatedTasks.modifiedCount} tasks`,
      notFoundIds: notFoundIDs.length ? notFoundIDs : "All IDs found",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};
