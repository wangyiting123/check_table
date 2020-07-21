const fs = require('fs');
const express = require('express');
const initData = require('./mockData')


const listData = initData();

const getList = function (app) {


    // 设定 /game 路径的路由
    app.get('/list',
    
        function (request, response, next) {
            console.log('11')
            
            // 通过next执行后续中间件
            next();
    
            // 当后续中间件执行完之后，会执行到这个位置
            console.log(
                '22'
            )
        },
    
        function (request, response, next) {
            // express自动帮我们把query处理好挂在request上
    
    
            console.log('33')
            next();
        },
    
        function (req, response) {
            console.log(44)
            
            // 如果这里执行setTimeout，会导致前面的洋葱模型失效
            // 因为playerWon不是在中间件执行流程所属的那个事件循环里赋值的
            // setTimeout(()=> {
                response.status(200);
                response.send(listData)
            // }, 500)
        }
    )
}


module.exports = getList;