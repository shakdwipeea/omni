/**
 * Created by Akash on 23-02-2015.
 */
module.exports = function (id , password, callback) {
    //todo check the id & password and pass the relevant data

    var mysql = require('mysql');
    var _ = require('underscore');

    var params = require('./conn');

    var connection = mysql.createConnection(params);

    var query = "SELECT * FROM teacher_details WHERE teacher_id = ? AND password = ?";

    var query = mysql.format(query, [id, password]);

    var data = {
        error: true
    }

    connection.query(query, function (err, rows) {

        if (err) {
            data.error = err;
        }

        if (rows[0]) {
            data.error = false;
            _.extend(data, rows);
        }
        else {
            data.error = 'No column found'
        }

        callback(data);
    });
}

