const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.projects = require("./project.model.js")(sequelize, Sequelize);
db.tasks = require("./task.model.js")(sequelize, Sequelize);
db.labels = require("./label.model.js")(sequelize, Sequelize);
db.comments = require("./comment.model.js")(sequelize, Sequelize);

db.user.hasMany(db.projects, {
  onDelete: "CASCADE",
});

db.projects.hasMany(db.tasks, {
  onDelete: "CASCADE",
});
db.tasks.belongsTo(db.projects);

// this relation is not set proper yet
db.tasks.hasMany(db.labels);
db.labels.hasMany(db.tasks);




module.exports = db;
