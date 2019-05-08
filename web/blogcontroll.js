var blogdb = require("../dao/blogdb");
var tagsdb = require("../dao/Tagsdb");
var tagblogdb = require("../dao/tagblog");
var timeutil = require("../util/timeutil");
var resputil = require("../util/Resputil");
var url = require("url");
var path = new Map();


function queryHotBlog(request,response) {
    blogdb.queryHotBlog(5,function (result) {
        response.writeHead(200);
        response.write(resputil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryHotBlog",queryHotBlog);

function queryAllBlog(request,response) {
    blogdb.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(resputil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryAllBlog",queryAllBlog);

function queryBlogById(request,response) {
   var params = url.parse(request.url,true).query;
   blogdb.queryBlogById(parseInt(params.bid),function (result) {
       response.writeHead(200);
       response.write(resputil.writeResult("success","查询成功",result));
       response.end();
       blogdb.addViews(parseInt(params.bid),function (result) {
       })
   })
}
path.set("/queryBlogById",queryBlogById);


function queryBlogCount(request,response) {
    blogdb.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(resputil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryBlogCount",queryBlogCount);
function queryBlogByPage(request,response) {
    var params = url.parse(request.url,true).query;
    blogdb.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), function (result) {
        for (var i = 0 ; i < result.length ; i ++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(resputil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryBlogByPage",queryBlogByPage);
function editBlog(req,res) {
    var params = url.parse(req.url,true).query;
    var tags = params.tags.replace(/ /g, "").replace("," , ",");
    req.on("data",function (data) {
        blogdb.insertBlog(params.title,data.toString(),0,tags, timeutil.getNow(),timeutil.getNow(),function (result) {
            res.writeHead(200);
            res.write(resputil.writeResult("success","添加成功",null));
            res.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0; i < tagList.length; i++ ){
                if(tagList[i] == ""){
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        });
    });
}
path.set("/editBlog",editBlog);

function queryTag(tag,blogId) {
    tagsdb.queryTag(tag,function (result) {
         if(result == null || result.length == 0){
             insertTag(tag, blogId);
         }else{
             tagblogdb.insertTagBlogMapping(result[0].id, blogId, timeutil.getNow(), timeutil.getNow(), function (result) {
             });
         }
    })
}

function insertTag(tag, blogId) {
    tagsdb.insertTag(tag, timeutil.getNow(), timeutil.getNow(),function (result) {
        insertTagBlogMapping(result.insertId,blogId);
    })
}

function insertTagBlogMapping(tagId, blogId) {
    tagblogdb.insertTagBlogMapping(tagId,blogId, timeutil.getNow(),timeutil.getNow(),function (result) {
    })
}

module.exports.path = path;
