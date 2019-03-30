var express = require("express");
var globalconfig = require("./config");
var loder = require("./loder");


var app = new express();

app.use(express.static("./page/"));//静态文件位置
app.post("/editeveryday",loder.get("/editeveryday"));
app.get("/queryEveryday",loder.get("/queryEveryday"));

app.post("/editBlog",loder.get("/editBlog"));
app.get("/queryBlogByPage",loder.get("/queryBlogByPage"));

app.get("/queryBlogCount",loder.get("/queryBlogCount"));
app.get("/queryBlogById",loder.get("/queryBlogById"));
app.get("/addComment",loder.get("/addComment"));
app.get("/queryRandomCode",loder.get("/queryRandomCode"));
app.get("/queryCommentsByBlogId",loder.get("/queryCommentsByBlogId"));
app.get("/queryCommentsCountByBlogId",loder.get("/queryCommentsCountByBlogId"));
app.get("/queryAllBlog",loder.get("/queryAllBlog"));
app.get("/queryRandomTags",loder.get("/queryRandomTags"));
app.get("/queryHotBlog",loder.get("/queryHotBlog"));
app.get("/queryNewComments",loder.get("/queryNewComments"));
app.get("/queryByTag",loder.get("/queryByTag"));
app.get("/queryByTagCount",loder.get("/queryByTagCount"));
app.listen(globalconfig.port,function () {
  console.log("服务器已启动");
});