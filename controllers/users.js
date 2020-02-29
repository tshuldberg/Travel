const User = require('../models/user')
const Post = require('../models/post')
const Dest = require('../models/destination')

module.exports = {
    index,
    addPost,
    delPost,
    update,
    new: newPost,
    show
}


function index(req, res, next) {
    console.log(req.query)
    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    let sortKey = req.query.sort || 'name';
    User.find(modelQuery).sort(sortKey).exec(function (err, users) {
        if (err) return next(err)
        res.render('users/index', {
            users,
            user: req.user,
            name: req.query.name,
            sortKey
        })
    })
}

function newPost(req, res) {
    res.render('users/new', { title: 'Add A Travel Post' })
}

function show(req, res) {

}

function addPost(req, res, next) {
    req.user.save(function(err) {
        res.redirect('/users')
    })
}

function delPost(req, res, next) {
    User.findOne({'posts._id': req.params.id }, function(err, user) {
        User.post.id(req.paramds.id).remove()
        User.save(function(err) {
            res.redirect('/users')
        })
    })
}

function update(req, res, next) {


}