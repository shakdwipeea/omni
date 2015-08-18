/**
 * Created by akash on 1/27/15.
 */

var appraisalApi = function(app) {

    app.post('/student_appraisal_login', function(req, res) {
        var appraisalHelper;
        console.log("Request is ",req.body);
        appraisalHelper = require('../database/student_appraisal');
        if (req.body.usn) {
            appraisalHelper(req.body.usn, function(sem) {
                

                if (sem === "No such Usn") {
                    res.status(500).json({
                        err:'No usn found'
                    });
                }

                else if (sem.err === true) {
                    res.status(500).json({
                        err: sem.msg
                    });
                }

                else if (sem !== null) {
                    console.log(sem);
                    res.json(sem);
                }

                else {
                    return res.json({
                        err: 'Error'
                    });
                }
            });
        }
    });

    app.get('/get_appraisal_questions', function  (req,res) {
         var getQuestionHelper;
         getQuestionHelper = require('../database/appraisal_questions')(res);
    });

    app.post('/feedback', function (req, res) {
        require('../database/submit_appraisal')(req.body, function (done) {
            res.json(done);
        });
    });

    app.post('/staff_login', function (req, res) {
        var staffHelper = require('../database/staff_appraisal');
        if(req.body.id && req.body.password)
        {
            staffHelper(req.body.id ,req.body.password, function (data) {
                res.json(data);
            });
        }
        else
        {
            res.json({
                error: true
            });
        }
    });

    app.post('/staff_report', function (req, res) {
        var staffReport = require('../database/staff_report');

        var damn = {};

        damn.table = req.body.table;
        damn.type = req.body.type;

        if(damn)
        {
            staffReport(damn, function (data) {
                res.json(data);
            });
        }
        else
        {
            res.json({
                error: true
            });
        }
    });

	app.post('/new_class', function (req, res) {
        console.log(req.body);

        var newClass = require('../database/new_class');

        if (!req.body.teacher_id) {
            res.json({
                err: 'Occured'
            });
        } else {

            newClass(req.body, function  (data) {
                // body...
                res.json(data);
            });
        }

        
    });

    app.post('/change_password', function  (req, res) {

        var changePassword = require('../database/change_password');

        if (req.body) 
        {
            changePassword(req.body, function  (response) {
                res.json(response);
            })
        } 
        else 
        {
            res.json ({
                err: true,
                message: 'Blank Request'
            });
        }
    });

    app.get('/pictures', function (req, res) {

    })
    
    app.post('/flag_admin', function (req, res) {
        var flagError = require('../database/flag_error');

        if (req.body) 
        {
            flagError(req.body.data, function  (response) {
                res.json(response);
            })
        } 
        else 
        {
            res.json ({
                err: true,
                message: 'Blank Request'
            });
        }
    })

    app.post('/check_complete', function  (req, res) {
        console.log('Received request+', req.body);
        if (req.body.app && req.body.count && req.body.usn) {
            var checkFromDb = require('../database/check_complete_appraisal');
            checkFromDb({
                app: req.body.app,
                count: req.body.count,
                usn: req.body.usn
            }, function  (err, flag) {
                if (err) {
                    res.json({
                        err: true,
                        message: 'No such usn'
                    });
                } else {
                    res.json({
                        err: false,
                        isComplete: flag
                    })
                }
            })
        } else {
            res.json({
                err: true,
                message: 'Send the correct params'
            })
        }
    })

    
};

module.exports = appraisalApi;
