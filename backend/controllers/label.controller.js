const db = require("../models/index");

const Label = db.labels;

exports.getAllPersonalLabels = (req, res) => {
  Label.findAll()
    .then((label) => {
      res.status(200).json(label);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some Error occurred while retrieving labels",
      });
    });
};

exports.createNewPersonalLabel = (req, res) => {
  const newData = req.body;

  if (!newData.name || newData.name.trim() === "") {
    return res.status(400).send({
      message: "Please provide label name, it is mandatory",
    });
  }

  Label.create(newData)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some Error occurred while creating label",
      });
    });
};

exports.getPersonalLabelById = (req, res) => {
  const id = req.params.id;

  Label.findByPk(id)
    .then((label) => {
      if (!label) {
        return res.status(404).send({
          message: `Cannot find label with id=${id}`,
        });
      }

      res.status(200).send(label);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some Error occurred while retrieving label of id=" + id,
      });
    });
};

exports.updatePersonalLabel = (req, res) => {
  const id = req.params.id;
  const updateData = req.body;

  Label.update(updateData, {
    where: {
      id: id,
    },
    returning: true,
  }).then(([num, updatedLabel]) => {
    if (num === 1) {
      return res.status(200).send(updatedLabel);
    } else {
      return res.status(400).send({
        message: `Error occurred while updating labels of id=${id}, may be id not found in the database or Body is empty`,
      });
    }
  }).catch((err)=>{
    res.status(500).send({
      message: "Some Error occurred while updating labels of id=" + id,
    });
  })
};

exports.deletePersonalLabel = (req, res) => {
    const id = req.params.id;

    Label.destroy({
      where: {
        id: id,
      },
    })
    .then((data) => {
        if (data === 1) {
          return res.status(200).send(true);
        } else {
          return res.status(404).send({
            message: `Cannot delete label with id=${id}, may be id not found in the database`,
          });
        }
      })
    .catch((err) => {
        res.status(500).send({
          message: "Could not delete label of id =" + id,
        });
      });
};
