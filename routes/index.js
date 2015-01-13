/*var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();*/

//todo:verify password before logging in


var router = function (app,jwt) {
  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.post('/login', function (req, res) {

    console.log('Recieved post data' , req.body);

    //Student login
    //Logging in by checking usn and password
    var studentProfile = require('../database/student_prof');

    studentProfile(req.body, function (profile) {

      console.log(profile);
      if(!profile) {
        res.send(401, 'Wrong username and password here hh');
        return;
      }

      var token = jwt.sign(profile,app.get('secret'),{expiresInMinutes: 60 * 5});
      res.json({token:token});

    });
    });

  app.post('/login_staff', function (req, res) {
    var teacherProfile = require('../database/teacher_prof');

    teacherProfile(req.body, function (err,profile) {
      if(err) {
        console.log(err);
        res.status(401).send('Wrong credentials');
      }

      if(profile) {
        var token = jwt.sign(profile, app.get('secret'), {expiresInMinutes: 60 * 5});
        res.json({token: token});
      } else {
        res.status(500).send('Internal error');
      }



    })

  })



}

/* GET home page. */

module.exports = router;
