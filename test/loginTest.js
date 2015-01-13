/**
 * Created by akash on 25/10/14.
 */
var assert = require('assert');
var request = require('request');
var should = require('should');
var fs = require('fs');

var url = 'http://localhost:3000';

var loginUsn = '1RV12CS118';
var loginPass = 'abcxyz112';

var loginTeacherUsn = '1RV12TCS075';
var loginTeacherPassword = 'abcxyz261';

describe('login functionality', function () {

    it('should return a token', function (done) {
        request.post({url: url + '/login', form: { usn:loginUsn,password:loginPass } }, function (err, res, body) {
            console.log(body);
            assert.notEqual(JSON.parse(body).token,undefined);
            done();
        });
    })

    it('should give unauthorized error', function (done) {
        request.post({url:url + '/login', form: {username:'akas',password:'cool'}}, function (err, res, body) {
            /*console.log(res);
            fs.writeFileSync('./err.json',JSON.stringify(res));-*/
            assert.equal(res.statusCode,401);
            done();
        });
    })

    it('should log the teacher in and return a token', function (done) {
        request.post({url:url + '/login_staff', form: {
            username: loginTeacherUsn,
            password: loginTeacherPassword
        }}, function (err, res, body) {
            console.log(body);
            if(res.statusCode == 200) {
                body = JSON.parse(body);
                assert.notEqual(body.token,undefined);
                done();
            } else {
                assert.equal(1,2);
            }
        })
    })
})

