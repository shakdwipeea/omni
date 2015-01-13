/**
 * Created by akash on 25/10/14.
 */
var assert = require('assert');
var request = require('request');
var url = 'http://localhost:3000';
describe('Api path to fetch content', function () {
    var token;
    var loginUsn = '1RV13CS065';
    var loginPass = 'abcxyz065';

    beforeEach(function (done) {
        request.post({url:url + '/login' , form: { usn:loginUsn,password:loginPass } }, function (err, res, body) {
            console.log(' Before Each ' ,body);
            token = JSON.parse(body).token;
            done();
        });
    })

    it('should give student\'s profile', function (done) {
        request.get(url + '/api/student_profile',{
            'auth': {
                'bearer':token
            }
        }, function (err, res, body) {
            assert.notEqual(JSON.parse(body).usn,undefined);
            done();
        });
    });

    it('should give unauthorised message', function (done) {
        request.get(url + '/api/student_profile', function (err, res, body) {
            assert.equal(res.statusCode,401);
            done();
        });
        });

    it('should give the list of subjects the student has ', function (done) {
        request.post(url + '/api/student_subject',{
            'auth': {
                'bearer': token
            }
        }, function (err,res,body) {
            console.log(body);
            body = JSON.parse(body);
            assert.equal(body.usn,loginUsn);
            done();
        })
    })


    });


