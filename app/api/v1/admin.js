/**
 * @description admin的路由 api接口
 * @author dyc
 */

const Router = require('koa-router');

const { AdminDao } = require('@dao/admin')

const { Reslove } = require('@lib/helper')

const {
    RegisterValidator
  } = require('@validators/admin')

const router = new Router({
    prefix: 'api/v1/admin'
})

const res = new Reslove()

router.post('/register', async (ctx, next)=>{
    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx);
    // 创建管理者
    const [err, data] = await AdminDao.create({
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    })

    if(!err){
        ctx.response.status = 200;
        ctx.body = res.json(data)
    }else{
        ctx.body = res.fail(err)
    }
})