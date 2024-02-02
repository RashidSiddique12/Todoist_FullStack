const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./models/index");
const projectRoute = require("./routes/project.route");
const taskRoute = require("./routes/task.route");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/rest/v2/project", projectRoute);
app.use("/rest/v2/task", taskRoute )

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
