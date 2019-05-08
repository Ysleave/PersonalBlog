var fs = require("fs");
var globalconfig = require("./config");

var controllerset = [];
var pathmap = new Map();

var fill = fs.readdirSync(globalconfig["path_web"]);
console.log(fill)
for(var i = 0; i < fill.length; i++){
    var temp = require("./" + globalconfig["path_web"] + "/" + fill[i]);

    if(temp.path) {
        for(var[k,v] of temp.path){
            if(pathmap.get(k) == null){
                pathmap.set(k,v);
            }else{
                throw new Error("url path异常, url:" + key);
            }
        }
        controllerset.push(temp);
    }


}
module.exports = pathmap;
