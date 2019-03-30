var blogdb = require("../dao/blogdb");
var tagsdb = require("../dao/Tagsdb");
var tagblogdb = require("../dao/tagblog");
var commentdb = require("../dao/commentdb");
var timeutil = require("../util/timeutil");
var resputil = require("../util/Resputil");
// 验证码插件
var captcha = require("svg-captcha");
var url = require("url");

var path = new Map()
function addComment(request,response) {
    var params = url.parse(request.url, true).query;

    commentdb.insertComment(parseInt(params.bid), parseInt(params.parent),params.parentName, params.userName, params.email, params.content, timeutil.getNow(), timeutil.getNow(), function (result) {
        response.writeHead(200);
        response.write(resputil.writeResult("success", "评论成功", null));
        response.end();
   });
}
path.set("/addComment",addComment);

function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:44});
    response.writeHead(200);
    response.write(resputil.writeResult("success", "评论成功",img));
    response.end();
}
path.set("/queryRandomCode",queryRandomCode);

function queryCommentsByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentdb.queryCommentsByBlogId(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(resputil.writeResult("success", "评论成功",result));
        response.end();
    })
}
path.set("/queryCommentsByBlogId",queryCommentsByBlogId);


function queryNewComments(request,response){
    commentdb.queryNewComments(5,function (result) {
        response.writeHead(200);
        response.write(resputil.writeResult("success", "评论成功",result));
        response.end();
    })
}
path.set("/queryNewComments",queryNewComments);


function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentdb.queryCommentCountByBlogId(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(resputil.writeResult("success", "评论成功",result));
        response.end();
    })
}
path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId)
module.exports.path = path;