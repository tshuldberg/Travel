const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')
const request = require('request')


module.exports = {
    create,
    new: newPost,
    showAll,
    showOne,
    update,
    delete: delPost
}

function showAll(req, res) {
    User.findById(req.params.id).populate('posts').exec(function (err, user) {
        if (err) console.log("WHOOPS ", err)
        user.posts.forEach((post, i) => {
            Dest.findById(post.destination._id, (err, dest) => {
                post.destination = dest
            })
        })
        res.render('posts/show', { title: 'My Posts', user })
    })
}

function showOne(req, res) {
    User.findById(req.params.id, function (err, user) {
        Post.findById(req.params.postId, function (err, post) {
            if (err) console.log('Error: ', err)
            post.save((err, p) => {
                if (err) console.log(err)
                user.save((err) => {
                    const options = {
                        url: 'https://restcountries.eu/rest/v2/all'
                    }
                    request(options, function (err, response, body) {
                        const countries = JSON.parse(body)
                        res.render('posts/edit', { title: 'Edit Post', user, post: p, countries })
                    })
                })
            })
        })
    })
}

function update(req, res) {
        Post.findByIdAndUpdate(req.params.postId, req.body, { new: true }, function (err, post) {
            if (err) console.log('WHY DID YOU BREAK',err)
            res.redirect(`/users/${req.params.id}/posts`)
        })
}

function create(req, res) {
    User.findById(req.params.id, function (err, user) {
        let country = new Dest({ country: req.body.country });
        country.save((err, c) => {
            req.body.destination = c
            let post = new Post(req.body)
            post.c = country.name
            console.log('AAAAAAAAAAAAAAA', post.c)
            post.author = user.name
            post.save((err, post) => {
            console.log(post)
                if (err) {
                    console.log("ERRRRR ", err)
                    res.redirect(`/users/${user._id}/posts`)
                } else {
                    user.posts.push(post)
                    user.save(function (err, u) {
                        console.log("USERRRR WITH DEST ", u)
                        res.redirect(`/users/${user._id}/posts`)
                    })
                }
            })
        })
    })
}



function newPost(req, res) {
    const options = {
        url: 'https://restcountries.eu/rest/v2/all'
    }
    User.findById(req.params.id, function (err, user) {
        request(options, function (err, response, body) {
            const countries = JSON.parse(body)
            res.render('posts/new', { title: 'Create A New Post', user, countries })
        })
    })
}

function delPost(req, res, next) {
    User.findById(req.params.id, function (err, user) {
        Post.findByIdAndDelete(req.params.postId, (err, post) => {
            user.save(function (err) {
                res.redirect(`/users/${user._id}/posts`)
            })
        })

    })
}