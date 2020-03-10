const router = require('express').Router()
const destsCtrl = require('../controllers/destinations')


router.get('/destinations', destsCtrl.getDest)
router.post('/destinations', destsCtrl.show)
// post for all dests population /createdestinations ( home page or unique path)

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/auth/google')
}

module.exports = router
