
module.exports = function(usn, callback) {
    var checkingUsn, conn, connection, mysql, query, _;

    var _questions = [];

    var data = {
        appraisal_ids:[]
    };

    _ = require('underscore');

    mysql = require('mysql');

    conn = require('../database/conn');

    isComplete = require('../database/check_complete_appraisal');

    connection = mysql.createConnection(conn);

    query = "select first_name, middle_name, last_name , class_id, semester from student_details where usn = ?";

    query = mysql.format(query, [usn]);

    console.log("Query us ",query);
    var checkingUsn = connection.query(query, function(err, rows) {
        var sem;
       // console.log("Rows are",rows[0]);
        if (err)
        {
            return callback(null);
        }
        else if (!rows[0])
        {
            return callback('No such Usn');
        }
        else
        {
            console.log("Rowws are", rows[0]);
            sem = rows[0].semester;

            query = "SELECT * FROM enable_table WHERE semester = ?";
            query = mysql.format(query,[sem]);

            var go = false;

            var q = connection.query(query, function  (err, rows) {
                if (err)
                {
                    console.log(err);
                    return callback({
                        err: true,
                        msg: 'Error in enable_table'
                    });
                }
                else
                {
                    console.log('Line 46',rows[0]);
                    if (rows[0].enable != 1)
                    {
                       return callback({
                            err:true,
                            msg:'Appraisal not enabled.'
                       });
                    }
                    else
                    {
                        go = true;
                        data.appraisal_count = rows[0].appraisal_count;
                    }
                };
            });

            q.on('end', function  () {
                if (go) {
                    _getCompound(sem,usn);
                }
            });
            //_getQuestions('t');
            // _getQuestions('l');
        }
    });

    function  _getCompound(sem,usn) {
        // body...
        var query = "select * from cse_" + sem + "_sem WHERE usn = ?";

        query = mysql.format(query,[usn]);

        console.log("Query i comp is ",query);

        connection.query(query, function  (err,rows) {
            if (err || !rows) {
                console.log('Error is in getCompuoung=',err);
            }
            else {
                compoundKeys = [];
                console.log("Rows are ", rows);

                if(rows[0].appraisal_complete_1 === 1) {
                  callback({
                    err: true,
                    msg: 'Step Aside. You have completed your appraisal'
                  })
                  return;
                }


                compoundKeys = _getCompoundKeys(rows[0]);
                console.log("Compound Keys are ", compoundKeys);

                if (compoundKeys.length === 0 || compoundKeys.length < 0) {
                    callback("No Subjects found");
                }

                else {
                    // callback("hello");
                    var idsReturned = [];

                    for (var i = 0; i < compoundKeys.length; i++) {
                        _getQuestionAndTeacher(compoundKeys[i], function  (id,rows) {

                            if (id === "error") {
                                console.log("Error in for loop in clback ");
                                callback('error');
                            }

                            else {

                                idsReturned.push(id);
                                if (idsReturned.length === compoundKeys.length) {

                                    console.log("Teacher_ids are ",data.appraisal_ids[0]);

                                    //data.appraisal_val = row['appraisal_val'];
                                    //todo: add support for appraisal val use data.compound_key Good Luck!



                                    for (var i = 0; i < data.appraisal_ids.length; i++) {

                                        _getTeacherDetails(data[data.appraisal_ids[i]],callback);
                                    };


                                    //callback('Done i guess');
                                }

                            }
                        });
                    };

                }


            }
        });
    }

    function _getCompoundKeys (row) {
        var compoundKeys = [];
        //hack for 6th sem

        for (var i = 1; i < 9; i++) {
            if (row['subject_' + i]) {
                compoundKeys.push(row.class_id + '_' + row['subject_' + i]);
            }
        }

        for (var i = 1; i < 4; i++) {
            if (row['class_elective_id_' + i]) {
                compoundKeys.push(row['class_elective_id_' + i]);
            }

            if (row['class_lab_id_' + i]) {
                compoundKeys.push(row['class_lab_id_' + i]);
            }

        }

        return compoundKeys;

    };

    var count = 0;

    function _getQuestionAndTeacher (compoundKey,clbk) {
        // body.
        var query = "Select subject_code,sub_name,sub_name_short,teacher_id_1, teacher_id_2, teacher_id_3, type, appraisal_teacher_1, appraisal_teacher_2, appraisal_teacher_3,type from map_table where compound_key=?";

        query = mysql.format(query,[compoundKey]);

        //console.log("Query in _getQuestionAndTeacher is ",query);

        connection.query(query, function  (err,rows) {
            if (err) {
                console.log("error",err);
                clbk("error");
            }
            else {
                console.log("Query inside connection.query in _getQuestio...m is ",query);
                console.log("Rows are in _getQuestion " ,rows);

                if (rows.length <= 0) {
                    console.log("Np row");
                    clbk("No row");
                }

                else {

                    var row;
                    row = rows[0];



                    //data.teacher_ids = [];
                    //



                    for (var i = 1; i < 4; i++) {
                        if (row['appraisal_teacher_' + i]) {
                            data.appraisal_ids.push(row['appraisal_teacher_'+ i]);
                            data[row['appraisal_teacher_' + i]] = {
                                type:'',
                                app: '',
                                id:'',
                                usn: usn,
                                subName: row['sub_name'],
                                subShortName: row['sub_name_short'],
                                subCode: row['subject_code']
                            };
                        }

                        if (row['type']) {
                            console.log("Ha ha row ",row['teacher_id_' + i]);
                            if (row['teacher_id_' + i]) {

                                console.log("Teacher id ",row['teacher_id_' + i]);

                                data[row['appraisal_teacher_' + i]].type = row['type'];
                                data[row['appraisal_teacher_' + i]].id = row['teacher_id_' + i];
                                data[row['appraisal_teacher_' + i]].app = row['appraisal_teacher_' + i];
/*

                                //Weirf dshoit
                                checkComplete(usn, data.appraisal_count, row['appraisal_teacher_' + i], i, row);



                                //
*/

                                console.log("Data is ",data);
                            }
                        }
                        else {
                            console.log("Type not found");
                            clbk("error");
                        }
                    }

                    clbk(compoundKey);


                }

            }
        });
    }
    var fuckingCount = 0;
    //Weird shit continued
    function checkComplete(usn, count, app, cb) {
        
        isComplete({
            usn: usn,
            count: count,
            app: app
        }, function  (err, flag) {
                fuckingCount++;
                console.log('Recevied flag', flag, app )
                if (flag === true) {
                    delete data[app]
                    var index = data.appraisal_ids.indexOf(app)
                    data.appraisal_ids.splice(index, 1);

                }
                cb();
        })

    }

    var Sent = true;

    function  _getTeacherDetails(appraisalId,callback) {
        // body...
        var q = "select first_name, middle_name, last_name, staff_initial from teacher_details where teacher_id = ?"

        q = mysql.format(q,[appraisalId.id]);

        console.log("Query is in getTeacherDetials ",q);

        var k = connection.query(q, function  (err,rows) {
            if (err) {
                console.log("Error", err);
                clbk("error", null);
            }
            else {
                console.log("Rows in this query is ", rows);
                //clbk(tableName,data);
                console.log("Teacher id is ", appraisalId);
               
                    data[appraisalId.app]['details'] = rows[0];
                
                
            }
        });

        k.on('end', function  () {
            count++;
            console.log("Hi!");
            //count === data.appraisal_ids.length && fuckingCount == 0
            if (count === data.appraisal_ids.length )  {
                ///DOne with all queries
                //console.log("Data is ", data);
                //connection.end();
                Sent = true;
                var len = data.appraisal_ids.length;
                //callback(data);
                data.appraisal_ids.forEach(function  (id) {
                    checkComplete(usn, data.appraisal_count, id, function  () {
                        console.log('c', fuckingCount, 'length', len)
                        if (fuckingCount === len && data.appraisal_ids.length > 0) {
                            callback(data);
                        } else if(data.appraisal_ids.length === 0){
                            callback({
                                err: true,
                                msg: 'Step Aside. You have completed your appraisal'
                            });
                        }
                    })
                })
            };
        })
    }



/*    //weird shit again
    function Final() {

        if (fuckingCount == 0 && count === data.appraisal_ids.length && Sent === false) {
            callback(data);
        };
        
    }*/





};
