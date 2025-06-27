const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

// All routes are protected
router.use(auth);

router
  .route("/")
  .post(createTask)
  .get(getTasks);

router
  .route("/:id")
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
