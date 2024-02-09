const express = require('express');
const router = express.Router();
const {verifySignUp} = require('../middleWare/verify');
const user = require('../controllers/user.controller');
const verifyToken = require('../middleWare/authJwt');

router.post("/signup",verifySignUp, user.signUp);
router.post("/login", user.login);
router.delete("/delete",verifyToken,user.deleteUser)



module.exports = router