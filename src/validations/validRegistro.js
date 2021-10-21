const db = require("../database/models");
const {body} = require("express-validator");

module.exports = [

    body("email")
        .notEmpty().withMessage("Obligatorio")
        .isEmail().withMessage("Email inválido")
        .custom((value,{req}) =>{
            console.log(value)
            return db.User.findOne({
                where: {
                    email: value
                }
            }).then(user =>{
                if(user){
                    return Promise.reject()
                }
            }).catch(() => Promise.reject("El email ya está registrado"))
        }),

    body("password")
        .notEmpty().withMessage("Obligatorio")
        .isLength({min: 6}).withMessage("mínimo 6 caractéres")
]