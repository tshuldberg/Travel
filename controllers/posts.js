const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')

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
        if (err) console.log("ERR ", err)
        res.render('posts/show', { title: 'My Posts', user })
    })
}

function showOne(req, res) {
    User.findById(req.params.id, function (err, user) {
        Post.findById(req.params.postId, function (err, post) {
            if(err) console.log('Error: ', err)
            post.save((err, post) => {
                if (err) console.log(err)
                user.save((err) => {
                    res.render('posts/edit', { title: 'Edit Post', user, post })
                })
            })
        })
    })
}
 

function update(req, res) {
    User.findById(req.params.id, function (err, user) {
        Post.findByIdAndUpdate(req.params.postId, req.body, {new: true}, function (err, post) {
            post.save((err, post) => {
                if (err) console.log(err)
                user.save((err) => {
                    res.redirect(`/users/${user._id}/posts`)
                })
            })
        })
    })
}

function create(req, res) {
    User.findById(req.params.id, function (err, user) {
        let post = new Post(req.body)
        post.author = user.name
        post.save((err, post) => {
            if (err) console.log(err)
            user.posts.push(post)
            user.save(function (err) {
                res.redirect(`/users/${user._id}/posts`)
            })
        })
    })
}

function newPost(req, res) {
    User.findById(req.params.id, function (err, user) {
        res.render('posts/new', { title: 'Create A New Post', user })
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