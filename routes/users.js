const router = require('koa-router')()
const UserController = require('../controller/user');
router.prefix('/api/v1')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


router.get('/user/:id',UserController.detail)

router.post('/user/create',UserController.create);

module.exports = router
