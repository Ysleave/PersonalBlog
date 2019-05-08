var everydaydb = require("../dao/everydaydb");
var timeutil = require("../util/timeutil");
var resputil = require("../util/Resputil");
var path = new Map();

function editeveryday(req,res) {
    req.on("data",function (data) {
        everydaydb.inserteveryday(data.toString().trim(),timeutil.getNow(), function (result) {
            res.writeHead(200);
            res.write(resputil.writeResult("success","添加成功",null));
            res.end();
        });
        console.log(data.toString().trim());
    })
}
path.set("/editeveryday",editeveryday);

function queryEveryday(req,res) {
    everydaydb.queryeveryday(function (result) {
        res.writeHead(200);
        res.write(resputil.writeResult("success","添加成功",result));
        res.end();
    });
}
path.set("/queryEveryday",queryEveryday);

module.exports.path = path;
