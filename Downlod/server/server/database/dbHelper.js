var express = require('express');
function check(data,call){
    var flag="visit";
    if(data){
        if(data.id==="ryzhang"&&data.password==="000000"){
            flag= "login";
        }else{
            flag= "fail";
        }
    }
    call(flag);
}
exports.check = check;

