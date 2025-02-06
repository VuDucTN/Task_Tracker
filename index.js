const fs = require("fs");
const path = "task.json";

const loadTask = () => {
  if (!fs.existsSync(path)) return [];
  try {
    return JSON.parse(fs.readFileSync(path, "utf-8"));
  } catch (error) {
    console.log("❌ Error reading tasks.json! Resetting tasks...");
  }
};

const saveTask = (task) => {
  fs.writeFileSync(path, JSON.stringify(task, null, 4));
};

const addTask = (description) => {
  const tasks = loadTask();
  tasks.push({
    id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
    description,
    status: "not done",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  saveTask(tasks);
  console.log("Task added!");
};

const updateTask = (id, description) => {
  const tasks = loadTask();
  const task = tasks.find((task) => task.id === parseInt(id, 10));
  if (task) {
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTask(tasks);
    console.log("Task updated!");
  } else {
    console.log("Task not found!");
  }
};

const deleteTask = (...ids) => {
  let tasks = loadTask();
  const initialLength = tasks.length;

  if (tasks.length === 0) {
    return console.log("❌ Task is empty!");
  }

  if (ids[0] === "ALL") {
    tasks = [];
    return console.log("✅ Deleted all!");
  }

  ids.forEach((id) => {
    tasks = tasks.filter((task) => task.id !== parseInt(id, 10));

    if (initialLength > tasks.length) {
      saveTask(tasks);
      console.log(`✅ Task deleted: ID ${id}`);
    } else {
      console.log(`❌ Task [${id}] not found!`);
    }
  });
};

const markStatus = (status, ...ids) => {
  const tasks = loadTask();
  let isUpdated = [];
  ids.forEach((id) => {
    const task = tasks.find((task) => task.id === parseInt(id, 10));

    if (task) {
      task.status = status;
      isUpdated.push(id);
    } else {
      console.log(`❌ Task [${id}] not found!`);
    }
  });

  if (isUpdated.length > 0) {
    saveTask(tasks);
    console.log(`✅ Tasks ${isUpdated} marked as ${status}!`);
  }
};

const listTask = (status) => {
  const tasks = loadTask();
  if (tasks.length === 0) return console.log("Tasks is empty");

  const filteredTasks = status
    ? tasks.filter((task) => task.status === status)
    : tasks;

  if (filteredTasks.length) {
    filteredTasks.forEach((task) => {
      console.log(` - [${task.id}] [${task.description}] [${task.status}]`);
      console.log(`  📅 Created: ${task.createdAt}`);
      console.log(`  🔄 Updated: ${task.updatedAt}`);
      console.log("===================================");
    });
  } else {
    console.log("No tasks found!");
  }
};

const [, , command, ...args] = process.argv;

switch (command) {
  case "add":
    addTask(args.join(" "));
    break;
  case "update":
    updateTask(args[0], args.slice(1).join(" "));
    break;
  case "delete":
    deleteTask(...args);
    break;
  case "delete_all":
    deleteTask("ALL");
    break;
  case "mark_in_progress":
    markStatus("in progress", ...args);
    break;
  case "mark_done":
    markStatus("done", ...args);
    break;
  case "list":
    listTask();
    break;
  case "list_not_done":
    listTask("not done");
    break;
  case "list_in_progress":
    listTask("in progress");
    break;
  case "list_done":
    listTask("done");
    break;
  default:
    console.log("Invalid command!");
}
