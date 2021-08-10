const Koa = require('koa');

const Router = require('koa-router')

const parser = require('koa-bodyparser');

const koaStatic = require('koa-static');

const router = new Router()

const app = new Koa();

app.use(parser());

app.use(koaStatic(__dirname + '/public'))

// app.use(async (ctx, next) => {

//     ctx.body = 'hello world!'
//     await next()
// });

router.get('/', async (ctx, next)=>{

    ctx.body = "首页"

})

router.get('/login', async (ctx, next)=>{

    ctx.body = "登录页"

})

app.use(router.routes()).use(router.allowedMethods())


app.listen(3000, () => {
    console.log('Koa is listening in http://localhost:3000')
})


module.exports = app