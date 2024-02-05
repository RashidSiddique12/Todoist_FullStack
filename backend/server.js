const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./models/index");
const cors = require('cors');
const projectRoute = require("./routes/project.route");
const taskRoute = require("./routes/task.route");
const userRoute = require("./routes/user.route");
const verifyToken = require("./middleWare/authJwt");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/rest/v2/user", userRoute);
app.use("/rest/v2/project", verifyToken, projectRoute);
app.use("/rest/v2/task", verifyToken, taskRoute);

app.all("*", (req, res) => {
  res.status(404).send({ message: "This endpoint not found in the server" });
});

db.sequelize
  .sync()
  .then(() => {
    console.log("DB Synced");
  })
  .catch((error) => {
    console.log("Failed to Sync " + error);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
