const express = require("express");
const router = express.Router();

const {list,detail,create,edit,destroy} = require('../controllers/moviesController')
const upload = require("../middlewares/multerMovies");
const validMovies = require('../validations/validMovies');
const updateMovie = require('../validations/updateMovie');


/* /movies */
router.get('/',list);
router.get('/detail/:id',detail);
router.post('/create',upload.single('image'),validMovies,create);
router.put('/edit/:id',upload.single('image'),updateMovie,edit);
router.delete('/delete/:id',destroy);
module.exports = router;