var db = require("./db");


function insertTag(tag,utime,ctime,success) {
    var insertSql = "insert into tags (`tag`, `utime`, `ctime`) values (?, ?, ?)";
    var params = [tag,utime,ctime];

    var connection = db.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

function queryTag(tag,success) {

    var insertSql = "select * from tags where tag = ?";
    var params = [tag];
    var connection = db.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}
function queryAllTag(success) {
    var insertSql = "select * from tags;";
    var params = [];

    var connection = db.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error)
        }
    });
    connection.end();
}

module.exports.insertTag = insertTag;
module.exports.queryTag = queryTag;
module.exports.queryAllTag = queryAllTag;