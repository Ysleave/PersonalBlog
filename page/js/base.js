var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[]
    },
    computed: {
       randomColor:function () {
           return function () {
               var red = Math.random() * 255;
               var green = Math.random() * 255;
               var blue = Math.random() * 255;
               return "rgb("+ red + "," + green + "," + blue + ")";
           }
       },
        randomSize:function () {
            return function () {
                var size = (Math.random() * 20 + 12) + "px";
                return size;
            }
        }
    },
    created:function () {
         axios({
             method:"get",
             url:"/queryRandomTags"
         }).then(function (resp) {
             var result = [];
             for (var i = 0 ; i < resp.data.data.length ; i ++) {
                 result.push({text:resp.data.data[i].tag, link:"/?tag=" + resp.data.data[i].tag});
             }
             randomTags.tags = result;
         })
    }
});

var newhot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]

    },

    created: function () {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(function (resp) {
            console.log(resp)
            var result = [];
            date =  resp.data.data;
            for (var i = 0 ; i < date.length ; i ++) {
                var temp = {};
                temp.title = date[i].title;
                temp.link = "/blog_detail.html?bid=" + date[i].id;
                result.push(temp);
            }
            newhot.titleList = result;
        });
    }
});

var newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList: [
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"},
            {name: "这里是用户名", date: "2018-10-10", comment: "这里是一大串评论，巴拉巴拉巴拉"}
        ]
    },
    filters: {
        formatDate: function (value) {
            let date = new Date(value * 1000);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        }
    },
    created: function () {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(function (resp) {
            console.log(resp);
            var result = [];
            for (var i = 0 ; i < resp.data.data.length ; i ++) {
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.data = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newComments.commentList = result;
        });
    }
});