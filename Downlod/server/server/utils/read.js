var express = require('express');
var fs = require('fs');

/**
 * 读取网页并返回
 * @param path 网页所在路径
 */
function html(path,response) {
    path="../site"+path;
    console.log("read:"+path);
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
exports.html=html;