/**
 * Created by akash on 26/10/14.
 */
var conn = require('../database/conn');
var mysql = require('mysql');
var assert = require('assert');


var connection;

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
        req.usn = '1RV13CS011';

        var prof = require('../database/student_prof')(req, function (profile) {
            assert.equal(profile.USN,'1RV13CS011');
            done();
        });


    })
})
