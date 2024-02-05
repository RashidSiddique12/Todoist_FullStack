const express = require('express');
const router = express.Router();
const {verifySignUp} = require('../middleWare/verify');
const user = require('../controllers/user.controller')

router.post("/signup",verifySignUp, user.signUp);
router.post("/login", user.login);



module.exports = router