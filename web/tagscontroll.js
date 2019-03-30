var blogdb = require("../dao/blogdb");
var tagsdb = require("../dao/Tagsdb");
var tagblogdb = require("../dao/tagblog");
var timeutil = require("../util/timeutil");
var resputil = require("../util/Resputil");
var url = require("url");
var path = new Map();

function queryRandomTags(request,response) {
    tagsdb.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        });
        response.writeHead(200);
        response.write(resputil.writeResult("success", "评论成功", result));
        response.end();
    })
}
path.set("/queryRandomTags",queryRandomTags);

function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tagsdb.queryTag(params.tag, function (result) {
        if (result == null || result.length == 0) {
            response.writeHead(200);
            response.write(resputil.writeResult("success", "查询成功", result));
            response.end();
        } else {
             tagblogdb.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), function (result) {

                var blogList = [];
                for (var i = 0 ; i < result.length ; i ++) {
                    blogdb.queryBlogById(result[i].blog_id, function (result) {
                        blogList.push(result[0]);
                    });
                }
                getResult(blogList, result.length, response);
            });
        }
    });
}
path.set("/queryByTag", queryByTag);

function getResult(blogList, len, response) {
    if (blogList.length < len) {
        setTimeout(function () {
            getResult(blogList, len, response);
        }, 10);
    } else {
        for (var i = 0 ; i < blogList.length ; i ++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(resputil.writeResult("success", "查询成功", blogList));
        response.end();
    }
}

function queryByTagCount(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params.tag);
    tagsdb.queyrTag(params.tag, function (result) {
        console.log(result);
           tagblogdb.queryByTagCount(result[0].id, function (result) {
            response.writeHead(200);
            response.write(resputil.writeResult("success", "查询成功", result));
            response.end();
        });
    });
}
path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;
