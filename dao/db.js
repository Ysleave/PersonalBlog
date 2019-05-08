var mysql = require("mysql");

function createConnection() {
    var connection = mysql.createConnection({
        host:"192.168.0.102",
        port:"3306",
        user:"root",
        password:"ye15253189868.",
        database:"my_blog"
    });
    return connection;
}
module.exports.createConnection = createConnection;