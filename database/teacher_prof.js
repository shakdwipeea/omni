/**
 * Created by akash on 13/1/15.
 */
module.exports = function (request,profileCallback) {
    var conn = require('./conn');
    var mysql = require('mysql');

    var connection = mysql.createConnection(conn);

    var query = "Select * from teacher_details where teacher_id = ?";
    query = mysql.format(query,[request.username]);

    console.log('Query is : ',query);
    connection.query(query, function (err, rows) {
        if(err) {
            console.log(err);
            profileCallback(true,null);
        } else {
            profileCallback(null,rows[0]);
        }
    })

}
