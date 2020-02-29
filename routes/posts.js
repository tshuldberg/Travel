var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts')

router.get('/', postsCtrl.index)



module.exports = router;
