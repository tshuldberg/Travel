const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')
const request = require('request')

module.exports = {
    getDest
}
function getDest(req, res) {
    const options = {
        url: 'https://restcountries.eu/rest/v2/all'
    }
    request(options, function (err, response, body) {
        const countries = JSON.parse(body)
        res.render('destination/index', { countries })
        
    })
}