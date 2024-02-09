

module.exports = (sequelize, Sequelize)=>{
    const Comment = sequelize.define('Comments', {
        id : {
            type : Sequelize.UUID,
            defaultValue : Sequelize.UUIDV4,
            primaryKey : true,
            allowNull : false 
        },
        posted_at:{
            type : Sequelize.DATE,
            defaultValue : Sequelize.NOW
        },
        content : {
            type : Sequelize.STRING,
            allowNull : false
        },
        attachment:{
            type : Sequelize.JSONB,
            defaultValue : null
        }
    }, {timestamps : false})
    return Comment;
}