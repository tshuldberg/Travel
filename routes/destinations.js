const router = require('express').Router()
const request = require('request')
const destsCtrl = require('../controllers/destinations')

// router.get('/', function(req, res, next) {
//     request(options, `${rootURL}`, function(err, response, body) {
//         const name = JSON.parse(body)
//         options.url = userData.repos_url;
//         res.render('destinations/index', {name: body})
//       }
//     )
//   })

router.get('/destinations', destsCtrl.getDest)



module.exports = router
