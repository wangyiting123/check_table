const fs = require('fs');
const koa = require('koa');
const mount = require('koa-mount')
const initData = require('./mockData')

const gameKoa = new koa();

const listData = initData();

gameKoa.use(
    async function (ctx, next) {
        console.log('tttt ')


        // 使用await 关键字等待后续中间件执行完成
        await next();

        console.log('2222')
    }
)
gameKoa.use(
    async function (ctx, next) {
        const query = ctx.query;
        const playerAction = query.action;
        console.log('33333')
       
        await next();

        // ctx.status = 200;
        // ctx.body = [{'text': 1}];
    }
)
gameKoa.use(
    async function (ctx, next) {

        // 对于一定需要在请求主流程里完成的操作，一定要使用await进行等待
        // 否则koa就会在当前事件循环就把http response返回出去了
        await new Promise(resolve => {
            setTimeout(() => {
                ctx.status = 200;
                ctx.body = listData;
                ctx.playerWon = true;
                resolve();
            }, 500)
        })
    }
)

const list = mount('/list', gameKoa);

module.exports = list;