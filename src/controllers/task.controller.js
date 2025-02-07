const Task = require("../models/task.model");

const getTask = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = status ? { status } : {};
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const createTask = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description is required!" });
    }

    const newTask = await Task.create({ description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTask = await Task.findByIdAndUpdate(
      id,
      {
        description,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updateTask) {
      return res.status(404).json({ error: "Task not found!" });
    }

    res.json(updateTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const delateTask = await Task.findByIdAndDelete(id);

    if (!delateTask) {
      return res.status(404).json({ error: "Task not found!" });
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
