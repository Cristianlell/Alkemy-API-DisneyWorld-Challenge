const express = require("express");
const router = express.Router();

const {create,edit,destroy} = require('../controllers/relationController');
const validRelation = require('../validations/validRelation');
const updateRelation = require('../validations/updateRelation');

/* /relations */
router.post('/create',validRelation,create);
router.put('/edit/:id',updateRelation,edit);
router.delete('/delete/:id',destroy);

module.exports = router;