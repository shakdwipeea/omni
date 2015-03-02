
module.exports = function(usn, callback) {
    var checkingUsn, conn, connection, mysql, query, _;

    var _questions = [];

    var data = {
        teacher_ids:[]
    };

    _ = require('underscore');

    mysql = require('mysql');

    conn = require('../database/conn');

    connection = mysql.createConnection(conn);

    query = "select first_name, middle_name, last_name , class_id, semester from student_details where usn = ?";

    query = mysql.format(query, [usn]);

    console.log("Query us ",query);
    var checkingUsn = connection.query(query, function(err, rows) {
        var sem;
        console.log("Rows are",rows[0]);
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
            //console.log();
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
                            msg:'Not allowed'
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
        var query = "select class_id, subject_1, subject_2, subject_3 subject_4, subject_5, subject_6, subject_7, subject_8, class_elective_id_1, class_elective_id_2, class_elective_id_3 , class_lab_id_1, class_lab_id_2, class_lab_id_3  from cse_" + sem + "_sem WHERE usn = ?";

        query = mysql.format(query,[usn]);

        console.log("Query i comp is ",query);

        connection.query(query, function  (err,rows) {
            if (err || !rows) {
                console.log('Error is in getCompuoung=',err);
            }
            else {
                compoundKeys = [];
                console.log("Rows are ", rows);
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

                                    console.log("Teacher_ids are ",data.teacher_ids);

                                    //data.appraisal_val = row['appraisal_val'];
                                    //todo: add support for appraisal val use data.compound_key Good Luck!



                                    for (var i = 0; i < data.teacher_ids.length; i++) {

                                        _getTeacherDetails(data.teacher_ids[i],callback);
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

        for (var i = 1; i < 9; i++) {
            if (row['subject_' + i]) {
                compoundKeys.push(row.class_id + '_' + row['subject_' + i]);
            }
        }

        for (var i = 1; i < 4; i++) {
            if (row['class_elective_id_' + i]) {
                compoundKeys.push(row.class_id + row['class_elective_id_' + i]);
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
        var query = "Select sub_name,sub_name_short,teacher_id_1, teacher_id_2, teacher_id_3, type, appraisal_teacher_1, appraisal_teacher_2, appraisal_teacher_3,type from map_table where compound_key=?";

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
                        if (row['teacher_id_' + i]) {
                            data.teacher_ids.push(row['teacher_id_'+ i]);
                            data[row['teacher_id_' + i]] = {
                                type:'',
                                app:'',
                                usn: usn,
                                subName: row['sub_name'],
                                subShortName: row['sub_name_short']
                            };
                        }

                        if (row['type']) {
                            console.log("Ha ha row ",row['teacher_id_' + i]);
                            if (row['teacher_id_' + i]) {

                                console.log("Teacher id ",row['teacher_id_' + i]);

                                data[row['teacher_id_' + i]].type = row['type'];
                                data[row['teacher_id_' + i]].app = row['appraisal_teacher_' + i];

                                console.log("Data is ",data);
                            }
                        }
                        else {
                            console.log("Type not found");
                            clbk("error");
                        }
                    }

                    clbk(compoundKey);

                    ///All the teacher should be in array

                    /* console.log("Teacher_ids are ",data.teacher_ids);

                     //data.appraisal_val = row['appraisal_val'];
                     //todo: add support for appraisal val use data.compound_key Good Luck!



                     for (var i = 0; i < data.teacher_ids.length; i++) {

                     _getTeacherDetails(data.teacher_ids[i], compoundKey,clbk);
                     };
                     */
                }

            }
        });
    }



    function  _getTeacherDetails(teacherId,callback) {
        // body...
        var q = "select first_name, middle_name, last_name, staff_initial from teacher_details where teacher_id = ?"

        q = mysql.format(q,[teacherId]);

        console.log("Query is in ??? ",q);

        var k = connection.query(q, function  (err,rows) {
            if (err) {
                console.log("Error", err);
                clbk("error", null);
            }
            else {
                console.log("Rows in this query is ", rows);
                //clbk(tableName,data);
                console.log("Teacher id is ", teacherId);
                data[teacherId]['details'] = rows[0];
            }
        });

        k.on('end', function  () {
            count++;
            console.log("Hi!");
            if (count === data.teacher_ids.length)  {
                ///DOne with all queries
                //console.log("Data is ", data);
                callback(data);
            };
        })
    }





};

