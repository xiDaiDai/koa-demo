const router = require('koa-router')()
const BidController = require('../controller/bid');


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/spiderAndSave', BidController.spiderAndSave)

router.get('/query',BidController.query);


module.exports = router
