var express = require('express');
var router = express.Router();
const destsCtrl = require('../controllers/destinations')


router.get('/', destsCtrl.index)



module.exports = router;
