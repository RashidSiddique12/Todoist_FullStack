require("dotenv").config()
// console.log(process.env.USER)

module.exports = {
    HOST: process.env.HOST,
    // USER: process.env.USER,
    USER: "postgres",
    PASSWORD: process.env.PASSWORD,
    DB : process.env.DB,
    dialect: process.env.DIALECT
}