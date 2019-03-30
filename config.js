var fs = require("fs");

var globalconfig = {};

var conf  =  fs.readFileSync("./service.conf");
var confs = conf.toString().split("\r\n");
for (var i = 0; i < confs.length; i++){
    globalconfig[confs[i].split("=")[0].trim()] = confs[i].split("=")[1].trim()
}
module.exports = globalconfig