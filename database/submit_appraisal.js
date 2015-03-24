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

    var error = false;

    //_.each(data, function (sub, index) {

        if(data.questions) {

            var answers = _.map(data.questions, function (question) {
                return question.answer;
            });

            var query;

            var count = data.appraisal_count

            if(data.type === 't')
            {
                query = "UPDATE ?? SET q1_" + count + " = ? , q2_" + count + " = ? , q3_" + count + " = ?, q4_" + count + " = ?, q5_" + count + " = ?, q6_" + count + " = ?,q7_" + count + " = ?, q8_" + count + " = ?, q9_" + count + " = ?, q10_" + count + " = ?, q11_" + count + " = ?,q12_" + count + " = ?, q13_" + count + " = ?, q14_" + count + " = ?, q15_" + count + " = ?, appraisal_complete_"+ count +" = 1  WHERE usn = ?"
            } else {
                query = "UPDATE ?? SET q1_" + count + " = ? , q2_" + count + " = ? , q3_" + count + " = ?, q4_" + count + " = ?, q5_" + count + " = ?, q6_" + count + " = ?,q7_" + count + " = ?, q8_" + count + " = ?, q9_" + count + " = ?, q10_" + count + " = ?, appraisal_complete_"+ count +"=1 WHERE usn = ?"
            }

            //todo improve this for second appraisal

            query = mysql.format(query, _.flatten([data.app, answers , data.usn]));

            console.log(query);

            connection.query(query, function (err, rows) {
                if (err) {
                    error = true;
                    callback(done);
                }

                else {
                    done = true;
                    callback(done);

                }
            });


        }
   // });


};