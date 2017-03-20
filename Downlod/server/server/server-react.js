/**
 * 练习使用react
 */
var express = require('express');
var querystring = require('querystring');
var http = require('http');
var url = require('url');
var read=require('./utils/read');
var db=require('./database/dbHelper');

function start() {
    function onCreated(request, response) {
        // 解析请求，包括文件名
        var pathname = url.parse(request.url).pathname;
        var data="";

        //屏蔽favicon请求
        if(request.url =='/favicon.ico'){
            return;
        }

        /**
         * 当请求体数据到来时触发
         */
        request.on("data",function (chunk) {
            data+=chunk;
            data=querystring.parse(data);
        });

        /**
         * 当请求体数据传输完毕时触发
         */
        request.on("end",function () {
            db.check(data,function(flag){
                if(flag==="login"){
                    read.html("/main.html",response);
                }else if(flag==="visit"){
                    read.html(pathname,response);
                }else if(flag==="fail"){
                    console.log("login fail!");
                    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
                    response.write("验证失败！");
                    response.end();
                }
            });
        });

        /**
         * 当请求结束时触发
         */
        request.on("close",function () {
            console.log("close");
        });

    }
// 创建服务器
    http.createServer(onCreated).listen(8080);
    console.log("server-react is created.");
}
exports.start = start;