const router = require('express').Router();
const usersCtrl = require('../controllers/users')

router.get('/users', usersCtrl.index)
router.get('/users/:id', usersCtrl.show)
// router.get('/new', usersCtrl.new)


module.exports = router;
