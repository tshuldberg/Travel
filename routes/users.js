var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users')

router.get('/', usersCtrl.index)
router.get('/new', usersCtrl.new)
router.get('/:id', usersCtrl.show)


/* GET users listing. */
router.get('/users', function(req, res, next) {


});

module.exports = router;
