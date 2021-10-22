const { body } = require("express-validator");
const path = require("path");

const db = require("../database/models");

module.exports = [
  body("image").custom((value, { req }) => {
    let imagen = req.file;
    let ext = [".jpg", "jpeg", ".png", ".gif", ".webp"];
    if (!imagen && req.method != "POST") {
      throw new Error("Tienes que subir una imagen");
    } else {
      let extencion = path.extname(imagen.originalname);
      if (!ext.includes(extencion)) {
        throw new Error(`Error: Las extensiones de archivo permitidas son
                    ${extensiones.join(", ")}`);
      }
    }

    return true;
  }),

  body("title")
    .notEmpty()
    .withMessage("Requerido")
    .bail()
    .isLength({ max: 255 })
    .withMessage("Demasiados caracteres"),


  body("releaseDate")
    .notEmpty()
    .withMessage("Requerido")
    .bail()
    .isDate()
    .withMessage("Debe ser una Fecha válida"),

  body("rating")
    .notEmpty()
    .withMessage("Requerido")
    .bail()
    .isInt({min : 1,max : 5})
    .withMessage("Solo números entre 1 y 5"),

  body("genreId")
    .notEmpty()
    .withMessage("Requerido")
    .bail()
    .isInt()
    .withMessage("Debe ser un Número"),
];
