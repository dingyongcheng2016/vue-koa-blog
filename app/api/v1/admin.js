/**
 * @description admin的路由 api接口
 * @author dyc
 */

const Router = require('koa-router');

const { AdminDao } = require('@dao/admin')

const { Reslove } = require('@lib/helper')

const router = new Router({
    prefix: 'api/v1/admin'
})

const res = new Reslove()

router.post('/register', async (ctx, next)=>{

    // 创建管理者
    const [err, data] = await AdminDao.create({
        email: '',
        password: '',
        nickname: ''
    })

    if(!err){
        ctx.response.status = 200;
        ctx.body = res.json(data)
    }else{
        ctx.body = res.fail(err)
    }
})