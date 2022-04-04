const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
// PUT is usually used to replace an entire resource, PATCH is for partial updates
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
