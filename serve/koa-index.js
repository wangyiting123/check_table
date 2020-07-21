const koa = require('koa');
const fs = require('fs');
const mount = require('koa-mount');
const static = require('koa-static');
const list = require('./table/list-koa');

const app = new koa();

app.use(
    static(__dirname + '/build/')
);

app.use(
    list
)


app.use(
    mount('/', async (ctx) => {
        ctx.body = fs.readFileSync(__dirname + '/build/index.html', 'utf-8')
    })
);

 app.listen(5000);