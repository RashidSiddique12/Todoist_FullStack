const jwt = require("jsonwebtoken");
require('dotenv').config();
const db = require("../models/index")
const USER = db.user;

const verifyToken = (req, res, next)=>{
    let token = req.headers?.authorization?.split(" ")[1];
    // console.log(token);

    if(!token){
        res.status(403).send({
            message: "No token provided"
        })
    }

    jwt.verify(token, process.env.SECRET_KEY,(err, decode)=>{
        if(err){
            return res.status(403).send({
                message: "Invalid token"
            })
        }

        req.userId = decode.id;
        next();

    })
}

module.exports = verifyToken