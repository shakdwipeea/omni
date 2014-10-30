/*var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();*/

var router = function (app,jwt) {
  app.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
  });

  app.post('/login', function (req, res) {

    console.log('Recieved post data' , req.body);


    //Logging in by checking usn and password
    var studentProfile = require('../database/student_prof');

    studentProfile(req.body, function (profile) {
      /*if(!(req.body.usn == 'akash' && req.body.password == 'akash')) {
        res.send(401, 'Wrong username and password here hh');
        return;
      }

      var profile = {
        username: 'Akash',
        branch: 'Computer Science',
        usn: '1RV13CS011'
      }*/

      console.log(profile);
      if(!profile) {
        res.send(401, 'Wrong username and password here hh');
        return;
      }

      var token = jwt.sign(profile,app.get('secret'),{expiresInMinutes: 60 * 5});
      res.json({token:token});

    });
    });

}

/* GET home page. */

module.exports = router;
