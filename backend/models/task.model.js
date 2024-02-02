module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define(
    "Task",
    {
        id : {
            type : Sequelize.UUID,
            defaultValue : Sequelize.UUIDV4,
            primaryKey: true,
            allowNull : false
        },
        section_id:{
            type : Sequelize.STRING,
            defaultValue : null
        },
        content : {
            type : Sequelize.STRING,
            allowNull : false
        },
        description : {
            type : Sequelize.STRING,
            defaultValue : ""
        },
        is_completed : {
            type : Sequelize.BOOLEAN,
            defaultValue : false
        },
        labels:{
            type: Sequelize.ARRAY(Sequelize.STRING)
        },
        parent_id:{
            type : Sequelize.STRING,
            defaultValue : null
        },
        order : {
            type : Sequelize.INTEGER,
        },
        priority:{
            type : Sequelize.INTEGER, 
        }, 
        due : {
            type : Sequelize.JSONB ,
            defaultValue : null
        },
        url : {
            type : Sequelize.STRING,
            defaultValue : null
        },
        comment_count : {
            type : Sequelize.INTEGER
        },
        created_at :{
            type : Sequelize.DATE,
            defaultValue : Sequelize.NOW
        },
        creator_id : {
            type : Sequelize.STRING
        },
        assignee_id : {
            type :Sequelize.STRING,
            defaultValue : null
        },
        assigner_id : {
            type : Sequelize.STRING,
            defaultValue : null
        },
        duration : {
            type : Sequelize.JSONB,
            defaultValue : null
        }


    }, 
    { 
      timestamps: false,
    }
  );

  return Task;
};
