const express = require("express");
const router = express.Router();
const task = require("../controllers/task.controller");

router.post("/", task.createTask);
router.get("/", task.getAllActiveTask);
router.get("/:id", task.getActiveTaskById);
router.put("/:id", task.updateTask);
router.put("/:id/close", task.closeTask);
router.put("/:id/reopen", task.reopenTask);
router.delete("/:id", task.deleteTask);

module.exports = router;
