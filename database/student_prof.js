
  module.exports = function(req, profileCallback) {
    var conn, connection, mysql, profile, q, query;
    conn = require('./conn');
    mysql = require('mysql');
    profile = {};
    connection = mysql.createConnection(conn);
    q = "select * from student_details where usn = '" + req.usn + "'";
    console.log(q);
    var query = connection.query(q, function(err, rows) {
      if (err) {
        console.log(err);
      }
      return profileCallback(rows[0]);
    });
  };

