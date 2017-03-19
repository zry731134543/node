var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var express = require('express');

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
                    readHTML("../main.html");
                }else{
                    response.write("");
                    response.end();
                }
            }else{
                console.log(paramter);
                if(paramter.split(".").lastIndexOf("html")){
                    // 输出请求的网址
                    var path = ".." + pathname;
                    // 从文件系统中读取请求的文件内容
                    readHTML(path);
                }
            }
            /**
             * 读取网页并返回
             * @param path 网页所在路径
             */
            function readHTML(path) {
                fs.readFile(path, function (err, data) {
                    if (err) {
                        console.log(err);
                        // HTTP 状态码: 404 : NOT FOUND
                        response.writeHead(404, {'Content-Type': 'text/html'});
                    } else {
                        // HTTP 状态码: 200 : OK
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        // 响应文件内容
                        response.write(data.toString());
                        response.end();
                    }
                });
            }
        });
    }

// 创建服务器
    http.createServer(onCreated).listen(8080);
    console.log("Server is created.");
}

exports.start = start;
