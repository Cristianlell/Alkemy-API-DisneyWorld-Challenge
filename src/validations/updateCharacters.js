const { body } = require("express-validator");
const path = require("path");

const db = require("../database/models");

module.exports = [
  body("image").custom((value, { req }) => {
    let imagen = req.file;
    let ext = [".jpg", ".png", ".jpeg", ".gif", ".webp"];
    if (imagen) {
        let extenciones = path.extname(imagen.originalname);
        
        if (!ext.includes(extenciones)) {
          throw new Error(`Error: Las extensiones de archivo permitidas son ${extensiones.join(", ")}`);
        }
    }

    return true;
  }),

  body("name").isLength({ max: 255 }).withMessage("Demasiados caracteres"),

  body("age").isInt().withMessage("Debe ser un Número"),

  body("weight").isInt().withMessage("Debe ser un Número"),

  body("history")
    .isLength({ max: 500 })
    .withMessage("Cantidad máxima de caracteres"),
];
