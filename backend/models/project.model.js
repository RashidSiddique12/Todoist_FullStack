
module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING,
        defaultValue : "charcoal"
      },
      parent_id: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      comment_count: {
        type: Sequelize.INTEGER,
      },
      is_shared: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      is_favorite: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      s_inbox_project: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      is_team_inbox: {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      },
      view_style: {
        type: Sequelize.STRING,
        defaultValue: "list",
      },
      url: {
        type: Sequelize.STRING,
        defaultValue : null
      },
    },
    {
      timestamps: false,
    }
  );
  return Project;
};
