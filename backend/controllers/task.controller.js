const db = require("../models/index");
const Task = db.tasks;

exports.createTask = (req, res) => {
  if (!req.body.content && req.body.content.trim() === "") {
    res.status(404).send({
      message: "Task content is mandatory",
    });
    return;
  }

  const newTask = { ...req.body, ProjectId : req.query.project_id };

  Task.create(newTask)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating the task",
      });
    });
};
exports.getAllActiveTask = (req, res) => {
  Task.findAll({
    where: {
      ProjectId:req.query.project_id,
      is_completed: false,
    },
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some Error while retrieving an Active Task",
      });
    });
};

exports.getActiveTaskById = (req, res) => {
  const id = req.params.id;

  Task.findAll({
    where: {
      id: id,
      is_completed: false,
    },
  })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot find active task from this id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error  in retrieving task with this id=" + id,
      });
    });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const updatedTask = req.body;

  Task.update(updatedTask, {
    where: {
      id: id,
    },
    returning: true,
  })
    .then((data) => {
      if (data[0] === 1) {
        res
          .status(200)
          .send(data[1]);
      } else {
        res.status(404).send({
          message: `Cannot update task with id=${id}, Maybe task was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in updating Task with id = " + id,
      });
    });
};

exports.closeTask = (req, res) => {
  const id = req.params.id;
  Task.update(
    {
      is_completed: true,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((data) => {
      if (data[0] === 1) {
        res.status(200).send(true);
      } else {
        res.status(404).send({
          message: `Cannot close task with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in closing the task of id = " + id,
      });
    });
};

exports.reopenTask = (req, res) => {
  const id = req.params.id;
  Task.update(
    {
      is_completed: false,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then((data) => {
      if (data[0] === 1) {
        res.status(200).send(true);
      } else {
        res.status(404).send({
          message: `Cannot reopen task with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in reopen the task of id = " + id,
      });
    });
};

exports.deleteTask = (req, res) => {
  const id = req.params.id;
  Task.destroy({
    where: {
      id: id,
    },
  })
    .then((data) => {
      if (data === 1) {
        // console.log(data);
        res.status(200).send(true);
      } else {
        res.status(404).send({
          message: `Cannot delete the Task of this id=${id}, Maybe task is not found with this id `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete the Task of this id = " + id,
      });
    });
};
