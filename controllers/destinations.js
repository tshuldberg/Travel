const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')
const request = require('request')

module.exports = {
    getDest,
    show,
}

function getDest(req, res) {
    Dest.find({}, function (err, dest) {
        if (dest === []) {
            const option = {
                url: 'https://restcountries.eu/rest/v2/all'
            }
            request(option, function (err, response, body) {
                let countries = JSON.parse(body)
                countries.forEach(country => {
                    let dest = new Dest(country.name)
                    dest.country = country.name
                    dest.save(function (err) {
                        if (err) console.log('ERROR IS', err)
                        console.log(dest)
                        res.render('destinations/index', { dest, countries })
                    })
                })
            })
        }
    })
    const options = {
        url: 'https://restcountries.eu/rest/v2/all'
    }
    request(options, function (err, response, body) {
        const countries = JSON.parse(body)
        res.render('destination/index', { countries })
    })
}

function show(req, res) {
    const options = {
        url: `https://restcountries.eu/rest/v2/name/${req.body.country}`
    }
    request(options, function (err, response, body) {
        let country = JSON.parse(body)[0].name
        Dest.find({ country }, function (err, dest) {
            Post.find({ destination: dest }, function (err, posts) {
                res.render('destination/show', { country, posts, dest })
            })
        })
    })
}

// function create(req, res) {
//     const options = {
//         url: 'https://restcountries.eu/rest/v2/all'
//     }
//     //deletemany {

//     //}
//     request(options, function (err, response, body) {
//         let countries = JSON.parse(body)
//         countries.forEach(country => {
//             let dest = new Dest(country.name)
//             dest.country = country.name
//             dest.save(function (err) {
//                 if (err) console.log('ERROR IS', err)
//                 res.render('/destinations', { dest, countries })
//             })
//         })
//     })
// }