const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')

module.exports = {
    index,
    create,
    new: newPost
}

function index(req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('users', { title: 'My Posts', user})
    })
}

function create(req, res) {
    let post = new Post(req.body)
    console.log(post)
    post.save(function(err) {
        if(err) console.log(err)
        console.log(post)
    })

    User.findById(req.params.id, function(err, user) {
        user.posts.push(post)
    })
}

function newPost(req, res) {
    User.findById(req.params.id, function(err, user) {

        res.render('new', { title: 'Create A New Post', user, post, dest})
    })
}

