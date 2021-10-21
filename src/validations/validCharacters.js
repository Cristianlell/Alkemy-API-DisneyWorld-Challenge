const {body} = require("express-validator");
const path = require("path");

const db = require("../database/models");

module.exports = [

    body("image")
    .custom((value,{req}) =>{
        
        let imagen = req.file;
        let ext = [".jpg",".png",".jpeg",".gif",".webp"]
        if(!imagen && req.method != "POST"){
            throw new Error("Tienes que subir una imagen");
        }else{
            let extencion = path.extname(imagen.originalname);
          if (!ext.includes(extencion)) {
            throw new Error(`Error: Las extensiones de archivo permitidas son
                    ${extensiones.join(", ")}`);
          }
        }
     
        return true
    }),

    body("name")
    .notEmpty().withMessage("Requerido").bail()
    .isLength({max : 255}).withMessage("Demasiados caracteres"),

    body("age")
    .notEmpty().withMessage("Requerido").bail()
    .isInt().withMessage("Debe ser un Número"),

    body("weight")
    .notEmpty().withMessage("Requerido").bail()
    .isInt().withMessage("Debe ser un Número"),

    body("history")
    .notEmpty().withMessage("Requerido").bail()
    .isLength({max : 500}).withMessage("Cantidad máxima de caracteres"),

]