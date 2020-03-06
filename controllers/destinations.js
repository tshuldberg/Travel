const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')
const request = require('request')

module.exports = {
    getDest,
    show,
}

function getDest(req, res) {
    User.findById(req.params.id, function (err, user) {

        // Dest.find({}, function (err, dest) {noce
        //     if (dest === []) {
        //         const option = {
        //             url: 'https://restcountries.eu/rest/v2/all'
        //         }
        //         request(option, function (err, response, body) {
        //             let countries = JSON.parse(body)
        //             countries.forEach(country => {
        //                 let dest = new Dest({ country: country.name })
        //                 dest.country = country.name
        //                 dest.save(function (err) {
        //                     if (err) console.log('ERROR IS', err)
        //                     res.render('destination/index', { dest, countries, user })
        //                 })
        //             })
        //         })
        //     }
        // })
        const options = {
            url: 'https://restcountries.eu/rest/v2/all'
        }
        request(options, function (err, response, body) {
            let countries = JSON.parse(body)
            if (err) console.log('ERROR IS', err)
            res.render('destination/index', { countries, user })
        })
    })

}

function show(req, res) {
    User.findById(req.params.id, function (err, user) {

        const options = {
            url: `https://restcountries.eu/rest/v2/name/${req.body.country}`
        }
        request(options, function (err, response, body) {
            let country = JSON.parse(body)[0].name
            Dest.find({ country }, function (err, dest) {
                Post.find({ destination: dest }, function (err, posts) {
                    if(err) console.log('WHERE WE GOING ERR' , err)
                    res.render('destination/show', { country, posts, dest, user })
                })
            })
        })
    })
}