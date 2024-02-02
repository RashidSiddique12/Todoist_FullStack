const express = require("express");
const router = express.Router();
const project = require("../controllers/project.controller");

router.post("/", project.createProject);
router.get("/", project.getAllProject);
router.get("/:id", project.getProjectById);
router.put("/:id", project.updateProject);
router.delete("/:id", project.deleteProject);

module.exports = router;
