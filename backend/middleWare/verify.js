const db = require("../models/index");
const User = db.user;

const verifySignUp = (req, res, next) => {
  const { username, email } = req.body;

  User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "User already exist",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(400).json({
          message: "User from this email already exist",
        });
      }
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
};

module.exports = { verifySignUp };
