module.exports = (sequelize, Sequelize) => {
  const Label = sequelize.define(
    "Labels",
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
        defaultValue: "charcoal",
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue :  4
      },
      is_favorite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Label;
};
