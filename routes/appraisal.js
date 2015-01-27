/**
 * Created by akash on 1/27/15.
 */

var appraisalApi = function(app) {
    app.post('/student_appraisal_login', function(req, res) {
        var appraisalHelper;
        console.log("Request is ",req);
        appraisalHelper = require('../database/student_appraisal');
        if (req.body.usn) {
            appraisalHelper(req.body.usn, function(sem) {
                if (sem !== null) {
                    console.log(sem);
                    (res.json(sem));
                } else {
                    return res.statusCode(500).end('Error');
                }
            });
        }
    });
};

module.exports = appraisalApi;
