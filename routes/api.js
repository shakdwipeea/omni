
  var apiRoutes;

  apiRoutes = function(app) {


    app.get('/api/student_profile', function(req, res) {
      var profile;
      profile = req.user;
      return res.status(200).json(profile);
    });


    app.post('/api/student_subject', function(req, res) {
      var studentSubjects;
      studentSubjects = require('../database/student_sub');
      return studentSubjects(req, function(subject_details) {
        if (subject_details) {
          console.log('Subject details are :', subject_details);
          res.status(200).json(subject_details);
        }
        return res.status(404).end();
      })

    });



  };

  module.exports = apiRoutes;
