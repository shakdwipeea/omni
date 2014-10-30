/**
 * Created by akash on 25/10/14.
 */
var assert = require('assert');
var request = require('request');
var url = 'http://localhost:3000';
describe('Api path to fetch content', function () {
    var token;

    beforeEach(function (done) {
        request.post({url:url + '/login' , form: { usn:'1RV13CS011',password:'shakdwipeea' } }, function (err, res, body) {
            console.log(body)
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
            assert.notEqual(JSON.parse(body).USN,undefined);
            done();
        });
    });

    it('should give unauthorised message', function (done) {
        request.get(url + '/api/student_profile', function (err, res, body) {
            assert.equal(res.statusCode,401);
            done();
        });
        });
    });


