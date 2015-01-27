
  module.exports = function(req, profileCallback) {
    var conn, connection, mysql, q, query, subjectTable;
    conn = require('./conn');
    mysql = require('mysql');
    connection = mysql.createConnection(conn);
    console.log("Req object is ", req.user);
    subjectTable = req.user.class_id.toLowerCase();
    subjectTable = subjectTable.substr(0, subjectTable.length - 1);
    subjectTable += 'class_id';
    q = "Select * from " + subjectTable + " where usn = '" + req.user.usn + "'";
    console.log('Query is ', q);
    var query = connection.query(q, function(err, rows) {
      console.log("The rows form student_details ", rows);
      if (err) {
        console.log(err);
      }
      return profileCallback(rows[0]);
    });
  };
