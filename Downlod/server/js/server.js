var express = require('express');
var querystring = require('querystring');
var http = require('http');
var url = require('url');
var fs = require('fs');
var readFile=require('./utils/readFile');

function start() {
    function onCreated(request, response) {
        // 解析请求，包括文件名
        var pathname = url.parse(request.url).pathname;
        var data="";
        request.on("data",function (chunk) {
            data+=chunk;
            data=querystring.parse(data);
        });

        request.on("end",function () {
            var paramter=pathname.substr(1);
            if(data){
                console.log(data);
                if(data.id==="ryzhang"&&data.password==="000000"){
                    readFile.readHTML("../main.html",response);
                }else{
                    response.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});
                    response.write("验证失败！");
                    response.end();
                }
            }else{
                console.log("请求网页："+paramter);
                if(paramter.split(".").lastIndexOf("html")){
                    // 输出请求的网址
                    var path = ".." + pathname;
                    // 从文件系统中读取请求的文件内容
                    readFile.readHTML(path,response);
                }
            }
        });
    }

// 创建服务器
    http.createServer(onCreated).listen(8080);
    console.log("Server is created.");
}

exports.start = start;
