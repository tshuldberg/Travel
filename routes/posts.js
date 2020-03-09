const router = require('express').Router();
const postsCtrl = require('../controllers/posts')

router.get('/users/:id/posts/new', isLoggedIn, postsCtrl.new)
router.post('/users/:id/posts', isLoggedIn, postsCtrl.create)
router.get('/users/:id/posts', isLoggedIn, postsCtrl.showAll)
router.get('/users/:id/posts/:postId', isLoggedIn, postsCtrl.showOne)
router.put('/users/:id/posts/:postId', isLoggedIn, postsCtrl.update)
router.delete('/users/:id/posts/:postId', isLoggedIn, postsCtrl.delete)


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next()
    res.redirect('/auth/google')
}

module.exports = router;
