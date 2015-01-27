
  module.exports = function(usn, callback) {
    var checkingUsn, conn, connection, mysql, query;

    mysql = require('node-mysql');

    conn = require('../database/conn');

    connection = mysql.createConnection(conn);

    query = "select first_name, middle_name, last_name , class_id, sem from student_details where usn = ?";
    
    query = mysql.format(query, [usn]);
    var checkingUsn = connection.query(query, function(err, rows) {
        var sem;
        if (err) {
          return callback(null);
        } else if (!rows[0]) {
          return callback('No such Usn');
        } else {
          sem = rows[0].sem;
          return callback(sem);
        }
    });
  };

