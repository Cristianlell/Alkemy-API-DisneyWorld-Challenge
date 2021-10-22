const { body } = require("express-validator");

module.exports = [

    body("characterId")
        .isInt()
        .withMessage("Solo números"),


    body("movieId")
        .isInt()
        .withMessage("Solo números"),
]