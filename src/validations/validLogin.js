const db = require("../database/models");
const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = [
  body("email")
    .notEmpty().withMessage("Obligatorio").bail()
    .isEmail().withMessage("Formato email no válido")
    .custom((value, { req }) => {
      return db.User.findOne({
        where: {
          email: value,
        },
      })
        .then((user) => {
          if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
            return Promise.reject();
          }
        })
        .catch((error) => Promise.reject("Credenciales inválidas"));
    }),

  body("password").notEmpty().withMessage("Obligatorio").bail(),
];
