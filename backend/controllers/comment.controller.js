const db = require("../models/index");
const Comment = db.comments;
exports.getAllComments = (req, res) => {
  Comment.findAll()
    .then((comments) => {
      res.send(200).send(comments);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occurred while retrieving the comments",
      });
    });
};

exports.createNewComment = (req, res) => {
  const newData = req.body;

  if (!newData.content || newData.content.trim() === "") {
    return res.status(400).send({
      message: "Please provide comment content ",
    });
  }

  Comment.create(newData)
    .then((comment) => {
      res.status(200).send(comment);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occurred while create new comment",
      });
    });
};

exports.getCommentById = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then((comment) => {
      if (!comment) {
        return res.status(404).send({
          message: `Cannot find comment with id=${id}`,
        });
      }
      return res.status(200).send(comment);
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error retrieving comment with id=${id}`,
      });
    });
};

exports.updateComment = (req, res) => {};

exports.deleteComment = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num === 1) {
        return res.status(200).send(true);
      } else {
        return res.status(404).send({
          message: `Error occurred while deleting the comment of id=${id},may be id not found`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error occurred while Deleting the comment of id" + id,
      });
    });
};
