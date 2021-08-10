const Koa = require('koa');

const Router = require('koa-router')

const parser = require('koa-bodyparser');

const koaStatic = require('koa-static');

const jwt = require('jsonwebtoken');
const jwtAuth = require('koa-jwt');

const bcrypt = require('bcryptjs');

const secret = 'hello world!'

const router = new Router()

const app = new Koa();

app.use(parser());

app.use(koaStatic(__dirname + '/public'))

app.use(async (ctx, next) => {

    ctx.body = 'hello world!'
    await next()
});

router.get('/', async (ctx, next)=>{

    const hash = bcrypt.hashSync('bacon', 8);
    console.log('hash', hash)
    const isTrue = bcrypt.compareSync('bacon', hash)
    console.log('isTrue', isTrue)
    ctx.body = "首页"

})

router.get('/api/login', async (ctx, next)=>{
    const { username, password } = ctx.query;
    // 盐值在变，一定程度防止被攻击
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("password", salt);
    
    const istrue = bcrypt.compareSync('password', hash)
    console.log('istrue', istrue)
    if(username === 'dyc' && password === '123456'){
        // 生成令牌
        const token = jwt.sign({
            data: {name: 'dyc'},
            exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
        },
        secret
        );
        ctx.body = {code: 200, token};
    }else{
        ctx.status = 401;
        ctx.body = {code: 401, message: '用户名或密码错误'}
    }
    
})


router.get('/api/userinfo', jwtAuth({secret}), async ctx => {
    ctx.body = {
        code: 200,
        data:{
            name: 'dyc', 
            age: 20
        }
    }
})


app.use(router.routes()).use(router.allowedMethods())


app.listen(3000, () => {
    console.log('Koa is listening in http://localhost:3000')
})


module.exports = app