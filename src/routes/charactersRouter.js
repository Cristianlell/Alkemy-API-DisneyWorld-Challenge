const express = require("express");
const router = express.Router();

const {list,detail,create,edit,destroy} = require('../controllers/characterController');
const upload = require("../middlewares/multerCharacter");
const validCharacters = require('../validations/validCharacters');
const updateCharacters = require('../validations/updateCharacters');

/* /characters */
router.get('/',list);
router.get('/detail/:id',detail);
router.post('/create',upload.single('image'),validCharacters,create);
router.put('/edit/:id',upload.single('image'),updateCharacters,edit);
router.delete('/delete/:id',destroy);

module.exports = router;