const Koa = require('koa');
const parser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const InitManager = require('./core/init')

require('module-alias/register')

const catchError = require('./middlewares/execption')

const app = new Koa();

app.use(catchError)

app.use(parser());

// app.use(koaStatic(__dirname + '/public'))

InitManager.initCore(app)

app.listen(3000, () => {
    console.log('Koa is listening in http://localhost:3000')
})


module.exports = app