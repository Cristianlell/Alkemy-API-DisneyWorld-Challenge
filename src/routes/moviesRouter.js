const express = require("express");
const router = express.Router();

const {list} = require('../controllers/moviesController')


/* /movies */
router.get('/',list);

module.exports = router;