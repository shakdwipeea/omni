/**
 * Created by Akash on 2/18/2015.
 */
module.exports = function (dataReceived, callback) {
    //todo integrate insertion query
    var mysql, conn, done, _, allDone = 0;

    mysql = require('mysql');
    conn = require('./conn');
    _ = require('underscore');

    var moment = require('moment');
    done = false;

    var data = dataReceived.curTeacher;

    var  connection = mysql.createConnection(conn);

    //var query = " "

    var error = false;

    var appraisalComplete = false;

    console.log('Date is',moment().format("YYYY-MM-DD HH:mm"));

    //_.each(data, function (sub, index) {

        if(data.questions) {

            var answers = _.map(data.questions, function (question) {
                return question.answer;
            });

            var query, query1, query2;

            var count = data.appraisal_count;

            console.log('Table is ',data.app);

            if(data.type === 't')
            {
                query = "UPDATE ?? SET q1_" + count + " = ? , q2_" + count + " = ? , q3_" + count + " = ?, q4_" + count + " = ?, q5_" + count + " = ?, q6_" + count + " = ?,q7_" + count + " = ?, q8_" + count + " = ?, q9_" + count + " = ?, q10_" + count + " = ?, q11_" + count + " = ?,q12_" + count + " = ?, q13_" + count + " = ?, q14_" + count + " = ?, q15_" + count + " = ?, appraisal_complete_"+ count +" = 1, comments_"+ count + " = ?  WHERE usn = ?"
            } else {
                query = "UPDATE ?? SET q1_" + count + " = ? , q2_" + count + " = ? , q3_" + count + " = ?, q4_" + count + " = ?, q5_" + count + " = ?, q6_" + count + " = ?,q7_" + count + " = ?, q8_" + count + " = ?, q9_" + count + " = ?, q10_" + count + " = ?, appraisal_complete_"+ count +"=1 , comments_" + count +" = ? WHERE usn = ?"
            }
            var tableName = 'cse_' + data.app.substr(14,1) + '_sem';

            //get total given appraisal from table
            query2 = "SELECT total_given_" + count + " FROM ?? WHERE usn = ?";
            query2 = mysql.format(query2,[tableName, data.usn])
            console.log(query2);
            connection.query(query2, function  (err, rows) {
                if(err) {
                    console.log(err)
                    callback(false)
                }
                console.log(rows)
                var given = rows[0]["total_given_" + count] || 0;


                if(given < dataReceived.totalAppraisal) {
                    given = given + 1;
                }


                               //hack because givenAppraisal is updated on client only after the response from here
                dataReceived.givenAppraisal++;

                //find if appraisal complete or not
/*                if (dataReceived.givenAppraisal === dataReceived.totalAppraisal)
                {
                    appraisalComplete = true;
                }*/

                if (given >= dataReceived.totalAppraisal)
                {
                    appraisalComplete = true;
                }

                console.log('Complete',appraisalComplete);

                query1 = "UPDATE ?? SET appraisal_complete_" + count + " = ? , appraisal_date_" + count + " = ? , total_given_" + count + " = ? WHERE usn = ?";

                var appraisalCompleteWrite = appraisalComplete === true ? 1 : 0;
                
                var dateComplete = appraisalComplete === true ? moment().format("YYYY-MM-DD") : 0;




                query1 = mysql.format(query1,[tableName,appraisalCompleteWrite, dateComplete, given, data.usn]);

                console.log('Query is 2nd appraisal', query1);


                //todo improve this for second appraisal

                query = mysql.format(query, _.flatten([data.app, answers , dataReceived.comments, data.usn]));

                console.log(query);

                connection.query(query, function (err, rows) {
                   allDone++;
                    if (err) {
                        error = true;
                        console.log('Error occured', err)
                        callback(false);
                    }

                    else {
                        error = false;
                        queryComplete();
                    }


                });

                connection.query(query1, function (err, rows) {
                    allDone++;
                    if (err) {
                        error = true;
                        callback(false);
                    }

                    else {
                        error = false;
                        queryComplete();
                    }

                });





            })

 

            function queryComplete () {
                if (allDone === 2)
                {
                    connection.end();
                    callback(true);
                }

            }


        } else {
            callback(false);
        }
   // });


};
