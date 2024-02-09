const db = require("../models/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = db.user;

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: 86400,
  });
};
exports.signUp = (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    username.trim() === "" ||
    !email ||
    email.trim() === "" ||
    !password
  ) {
    return res.status(400).send({
      message: "Please provide email, username and password",
    });
  }
  User.create({
    username: req.body.username.trim(),
    email: req.body.email.trim(),
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((user) => {
      const token = generateToken(user);
      res.status(200).send({ token, user });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error in creating new user",
      });
    });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || email.trim() === "") {
    return res.status(400).send({
      message: "Please provide email",
    });
  }
  if (!password || password.trim() === "") {
    return res.status(400).send({
      message: "Please provide password",
    });
  }
  User.findOne({
    where: {
      email: email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = generateToken(user);
    res.status(200).send({ token, user });
  });
};

exports.deleteUser = (req, res) => {
  User.destroy({
    where: {
      id: req.userId,
    },
  })
    .then((num) => {
      if (num === 1) {
        return res.status(200).send({ message: "User is deleted" });
      }
      return res.status(404).send({ message: "User not found" });
    })
    .catch((err) => {
      return res.status(500).send({ message: "Unable to delete user" });
    });
};
