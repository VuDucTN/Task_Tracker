require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();

connectDB();

app.use(express.json());

app.use("/task", routes);

app.use((err, req, res, next) => {
  console.error("🚨 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
