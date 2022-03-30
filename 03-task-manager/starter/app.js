const express = require("express");
const app = express();

app.get("/hello", (req, res) => {
  res.status(200).send("Task Manager App");
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is runnig on port ${port}...`);
});
