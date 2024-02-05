
module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("Users",{
        id : {
            type : Sequelize.UUID,
            defaultValue : Sequelize.UUIDV4,
            primaryKey : true,
            allowNull : false,
        },
        username : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email: {
            type : Sequelize.STRING,
            allowNull : false
        },
        password : {
            type : Sequelize.STRING,
            allowNull : false
        }
    },{
        timestamps : false
    } )

    return User;
}