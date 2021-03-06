const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')

module.exports = {
    index,
    addPost,
    new: newPost,
    show
}


function index(req, res, next) {
    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    let sortKey = req.query.sort || 'name';
    User.find(modelQuery).sort(sortKey).exec(function (err, users) {
        if (err) return next(err)
        res.render('user/index', {
            users,
            user: req.user,
            name: req.query.name,
            sortKey
        })
    })
}


function newPost(req, res) {
    User.findById(req.params.id, function(err, user) {
        res.render('posts/new', { title: 'Create A New Post', user})
    })}

function show(req, res) {
    User.findById(req.params.id, function(err, user) {
        console.log('THE USER IS HSHSHSHSHSHHSHS', user)
        Post.find({}).populate('destination').exec(function(error, p) {
            user.posts.forEach((post, i) => {
                if(post === null) {
                    user.posts.splice(i, 1)
                }
                
            })
            user.save((e ,u) => {
                if(e) console.log('user save e is', e)
                    res.render('user/show', {title: 'My Posts', user, p})
            })
        })
    })
}

function addPost(req, res, next) {
    req.user.save(function(err) {
        res.redirect('/users')
    })
}

