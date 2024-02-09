const express = require("express");
const router = express.Router();
const comment = require("../controllers/comment.controller");

router.get('/', comment.getAllComments);
router.post('/', comment.createNewComment);
router.get('/:id', comment.getCommentById);
router.put(":id", comment.updateComment);
router.delete("/:id", comment.deleteComment);

module.exports = router
