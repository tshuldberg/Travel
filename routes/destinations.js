const router = require('express').Router()
const destsCtrl = require('../controllers/destinations')


router.get('/destinations', destsCtrl.getDest)
router.post('/destinations', destsCtrl.show)
// post for all dests population /createdestinations ( home page or unique path)
//

module.exports = router
