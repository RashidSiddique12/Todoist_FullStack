const db = require("../models/index");
const Project = db.projects;

exports.createProject = (req, res) => {
  if (!req.body.name || req.body.name.trim() === "") {
    res.status(404).send({
      message: "Project name is mandatory",
    });
    return;
  }

  const NewProject = {
    ...req.body,
  };

  Project.create(NewProject)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the project.",
      });
    });
};

exports.getAllProject = (req, res) => {
  Project.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
    });
};

exports.getProjectById = (req, res) => {
  const id = req.params.id;
  Project.findByPk(id)
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res
          .status(404)
          .send({ message: `Cannot find Project with this id ${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id,
      });
    });
};

exports.updateProject = (req, res) => {
  const id = req.params.id;
  const updatedata = req.body;
  Project.update(updatedata, { where: { id: id }, returning: true, })
    .then((data) => {
      if (data[0] === 1) {
        res.status(200).send({ message: "Project is updated SuccessFully", data : data[1] });
      } else {
        res.status(404).send({
          message: `Cannot update Project with id=${id}, Maybe Project was not found or req.body is empty! `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in updating project with id = " + id,
      });
    });
};

exports.deleteProject = (req, res) => {
  const id = req.params.id;

  Project.destroy({ where: { id: id } })
    .then((data) => {
      if (data === 1) {
        res.status(200).send(true);
      } else {
        res.status(404).send({
          message: `Cannot delete Project with id=${id}, Maybe Project not found with this id`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete project of id =" + id,
      });
    });
};


