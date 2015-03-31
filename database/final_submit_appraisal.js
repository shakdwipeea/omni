/**
 * Created by akash on 28/3/15.
 */



module.exports = function (data, callback) {
    var mysql = require('mysql');
    var conn = require('./conn');

    var connection = mysql.createConnection(conn);

    var query = "UPDATE ?? SET appraisal_count_" + data.count + " = 1, appraisal_date_" + data.count + "WHERE usn = ?";

    query = mysql.format(query,[])
}
