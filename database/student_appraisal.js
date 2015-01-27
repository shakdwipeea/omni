
  module.exports = function(usn, callback) {
    var checkingUsn, conn, connection, mysql, query;

    mysql = require('mysql');

    conn = require('../database/conn');

    connection = mysql.createConnection(conn);

    query = "select first_name, middle_name, last_name , class_id, semester from student_details where usn = ?";
    
    query = mysql.format(query, [usn]);

    console.log("Query us ",query);
    var checkingUsn = connection.query(query, function(err, rows) {
        var sem;
        console.log("Rows are",rows[0]);
        if (err) {
          return callback(null);
        } else if (!rows[0]) {
          return callback('No such Usn');
        } else {
          //console.log();
          sem = rows[0].semester;
          _getCompound(sem,connection,usn);
        }
    });

    function  _getCompound(sem,connection,usn) {
      // body...
      var query = "select class_id, subject_1, subject_2, subject_3 subject_4, subject_5, subject_6, subject_7, subject_8, elective_id_1, elective_id_2, elective_id_3 , lab_batch_no_1, lab_batch_no_2, lab_batch_no_3  from cse_" + sem + "_sem WHERE usn = ?";

      query = mysql.format(query,[usn]);

      console.log("Query i comp is ",query);

      connection.query(query, function  (err,rows) {
        if (err || !rows) {
          console.log('Error is in getCompuoung=',err);
        } 
        else {
          console.log("Rows are ", rows);
          callback("hello");
        }
      });
    }




  };

