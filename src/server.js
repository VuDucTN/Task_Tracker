const app = require(".");

const PORT = process.env.PORT;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
