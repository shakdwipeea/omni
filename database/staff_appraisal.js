/**
 * Created by Akash on 23-02-2015.
 */
module.exports = function (id , password, callback) {
    //todo check the id & password and pass the relevant data

    var mysql = require('mysql');
    var _ = require('underscore');
    var events = require('events');

    var eventEmitter = new events.EventEmitter();

    var params = require('./conn');

    var connection = mysql.createConnection(params);

    var query = "SELECT * FROM teacher_details WHERE teacher_id = ? AND password = ?";

    var query = mysql.format(query, [id, password]);

    var data = {
        error: true,
        result: []
    }

    var count = 0,
        countDone = 0;

    var classes = [];

    connection.query(query, function (err, rows) {

        if (err) {
            data.error = err;
        }

        if (rows[0]) {
            data.error = false;
            _.extend(data, rows);


            for(var i = 1; i < 12; i++)
            {
                if(rows[0]['class_' + i])
                {
                    classes.push({
                        clas: 'class_' + i,
                        table: rows[0]['class_' + i]
                    });
                    count++;
                }
            }

            _.map(classes, function (clas) {
                getSubjectDetails(clas, id);
            });

        }
        else {
            data.error = 'No column found'
        }

    });

    eventEmitter.on('done', function () {
        console.log(data);
        callback(data);
    });

     function getSubjectDetails(clas, id)
     {
         var subCode = clas.table;
         var subCodeQuery;


         if(subCode.slice(-3,-2) === 'l')
         {
             //Lab Class
             subCodeQuery = subCode.slice(10,-1);
             _.extend(clas,{
                 type: 'lab'
             });
         }
         else
         {
             //Theory Class
             subCodeQuery = subCode.slice(8);
             _.extend(clas,{
                 type: 'theory'
             });
         }

         var query = 'SELECT * FROM subject_name WHERE subject_code = ?';
         query = mysql.format(query, [subCodeQuery]);

         connection.query(query, function (err, rows) {
             if(err)
             {
                 data.error = err;
                 eventEmitter.emit('done');
             }
             else
             {
                 _.extend(clas, rows[0]);
             }

             countDone++;

            done();
         });

         var query2 = "select distinct count(usn) as total, sum(appraisal_complete_1) as appraised from ??";
         query2 = mysql.format(query2,['appraisal_' + clas.table + '_' + id]);

         connection.query(query2, function (err, rows) {
             if(err)
             {
                 data.error = err;
                 eventEmitter.emit('done');
             }
             else
             {
                 _.extend(clas, rows[0]);
                 countDone++;
             }

             done();

         })

     }

    function done ()
    {
        if(countDone === 2 * count)
        {
            data.result = classes;
            eventEmitter.emit('done');
        }
    }

}

