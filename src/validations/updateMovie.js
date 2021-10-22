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

  body("title")
    .isLength({ max: 255 })
    .withMessage("Demasiados caracteres"),

    body("releaseDate")
    .isDate()
    .withMessage("Debe ser una Fecha válida"),

  body("rating")
    .isInt({min : 1,max : 5})
    .withMessage("Solo números entre 1 y 5"),
    

  body("genreId")
    .isInt()
    .withMessage("Debe ser un Número"),
];
