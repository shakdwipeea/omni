/**
 * Created by Akash on 2/18/2015.
 */
module.exports = function (data, callback) {
    //todo integrate insertion query
    var mysql, conn, done, _;

    mysql = require('mysql');
    conn = require('./conn');
    _ = require('underscore');
    done = false;

    var  connection = mysql.createConnection(conn);

    //var query = " "

    var count = 0, error = false;

    _.each(data, function (sub, index) {

        if(sub.questions) {

            var answers = _.map(sub.questions, function (question) {
                return question.answer;
            });

            var query;

            if(sub.type === 't')
            {
                query = "UPDATE ?? SET q1_1 = ? , q2_1 = ? , q3_1 = ?, q4_1 = ?, q5_1 = ?, q6_1 = ?,q7_1 = ?, q8_1 = ?, q9_1 = ?, q10_1 = ?, q11_1 = ?,q12_1 = ?, q13_1 = ?, q14_1 = ?, q15_1 = ?  WHERE usn = ?"
            } else {
                query = "UPDATE ?? SET q1_1 = ? , q2_1 = ? , q3_1 = ?, q4_1 = ?, q5_1 = ?, q6_1 = ?,q7_1 = ?, q8_1 = ?, q9_1 = ?, q10_1 = ? WHERE usn = ?"
            }

            //todo improve this for second appraisal

            query = mysql.format(query, _.flatten([sub.app, answers , sub.usn]));

            connection.query(query, function (err, rows) {
                if (err) {
                    error = true;
                    callback(done);
                }

                else {

                    count++;

                    if (count === _.size(data)) {
                        done = true;
                        callback(done);
                    }
                }
            });


        }
    });


};