/**
 * Created by akash on 25/10/14.
 */
var assert = require('assert');
var request = require('request');
var should = require('should');
var fs = require('fs');

var url = 'http://localhost:3000';

describe('login functionality', function () {





    it('should return a token', function (done) {
        request.post({url: url + '/login', form: { usn:'1RV13CS011',password:'shakdwipeea' } }, function (err, res, body) {
            console.log(body)
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
})

