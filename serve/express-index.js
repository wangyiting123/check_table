

const fs = require('fs');
const express = require('express');
const exStatic = require("express-static");
const listApp = require("./table/list-express");

const app = express();

listApp(app);

app.get('/', function (request, response) {
    // send接口会判断你传入的值的类型，文本的话则会处理为text/html
    // Buffer的话则会处理为下载
    response.send(
        fs.readFileSync(__dirname + '/build/index.html', 'utf-8')
    )
})

app.use(exStatic('./build'));

// 通过app.get设定 /favicon.ico 路径的路由
// .get 代表请求 method 是 get，所以这里可以用 post、delete 等。这个能力很适合用于创建 rest 服务
app.get('/favicon.ico', function (request, response) {
    // 一句 status(200) 代替 writeHead(200); end();
    response.status(200)
    return;
})

app.listen(5000);