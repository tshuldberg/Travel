const router = require('express').Router();
const postsCtrl = require('../controllers/posts')

router.get('/users/:id/posts/new', postsCtrl.new)
router.post('/users/:id/posts', postsCtrl.create)
router.get('/users/:id/posts', postsCtrl.showAll)
router.get('/users/:id/posts/:postId', postsCtrl.showOne)
router.put('/users/:id/posts/:postId', postsCtrl.update)
router.delete('/users/:id/posts/:postId', postsCtrl.delete)

module.exports = router;
