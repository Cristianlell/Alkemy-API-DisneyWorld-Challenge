const express = require("express");
const router = express.Router();

const validRegistro = require('../validations/validRegistro') 
const validLogin = require('../validations/validLogin') 
const {register, login} = require('../controllers/authController')


/* /auth */
router.post('/register',validRegistro,register)
router.post('/login',validLogin,login)

module.exports = router;