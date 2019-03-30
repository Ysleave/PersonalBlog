var mysql = require("mysql");

// var connection = mysql.createConnection({
//     host:"127.0.0.1",
//     port:"3306",
//     user:"root",
//     password:"ye15253189868.",
//     database:"my_blog"
// });
// module.exports = connection;

function createConnection() {
    var connection = mysql.createConnection({
        host:"127.0.0.1",
        port:"3306",
        user:"root",
        password:"ye15253189868.",
        database:"my_blog"
    });
    return connection;
}
module.exports.createConnection = createConnection;