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
    })
};

module.exports = appraisalApi;
