const express = require("express");
const router = express.Router();
const Label = require("../controllers/label.controller");

router.get("/", Label.getAllPersonalLabels);
router.post("/", Label.createNewPersonalLabel);
router.get("/:id", Label.getPersonalLabelById);
router.put("/:id", Label.updatePersonalLabel);
router.delete("/:id", Label.deletePersonalLabel);

module.exports = router;
