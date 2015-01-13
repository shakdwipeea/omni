/**
 * Created by akash on 26/10/14.
 */
var conn = require('../database/conn');
var mysql = require('mysql');
var assert = require('assert');


var connection;
var loginUsn = '1RV13CS065';
var loginPass = 'abcxyz065';
var loginTeacherUsn = '1RV12TCS075';

beforeEach(function (done) {
     connection = mysql.createConnection(conn);
    done();
});

describe('Database queries', function () {
    it('should create a connection to database', function (done) {
        connection.connect(function (err) {
            if(err) console.log('error' + err.stack);
            assert.ifError(err);
            done();
        });
        connection.end();
    });

    it('should contain student\'s profile extracted from the databse', function (done) {
        var req = {

        };
        req.usn = loginUsn;

        var prof = require('../database/student_prof')(req, function (profile) {
            console.log(profile);
            assert.equal(profile.usn,loginUsn);
            done();
        });


    })


    it('should contain the student subject details from the databse', function (done) {
        var req = {
        };

        req.user = {};

        req.user.usn = '1RV13CS065';
        req.user.class_id = 'CSE_3_B';

        require('../database/student_sub')(req, function(profile) {
            console.log('Profile as recieved from the database is :',profile);
            assert.equal(profile.usn,'1RV13CS065');
            done();
        })
    })
    
    it('should contain teachers profile from the database ', function (done) {
        var req = {
            username: loginTeacherUsn
        };

        require('../database/teacher_prof')(req, function (err,profile) {
            assert.ifError(err);
            assert.equal(profile.first_name,'amit');
            done();
        })

    })
})
