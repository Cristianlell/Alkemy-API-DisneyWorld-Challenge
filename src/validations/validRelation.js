const { body } = require("express-validator");

module.exports = [

    body("characterId")
    .notEmpty().withMessage("Obligatorio").bail()
        .isInt()
        .withMessage("Solo números"),


    body("movieId")
        .notEmpty().withMessage("Obligatorio").bail()
        .isInt()
        .withMessage("Solo números"),
]