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
                getSubjectDetails(clas);
            });

        }
        else {
            data.error = 'No column found'
        }

    });

    eventEmitter.on('done', function () {
        callback(data);
    });

     function getSubjectDetails(clas)
     {
         var subCode = clas.table;

         if(subCode.substr(-1,1) === 'l')
         {
             //Lab Class
             subCode = subCode.slice(10,-1);
         }
         else
         {
             //Theory Class
             subCode = subCode.slice(8);
         }

         var query = 'SELECT * FROM subject_name WHERE subject_code = ?';
         query = mysql.format(query, [subCode]);

         connection.query(query, function (err, rows) {
             if(err)
             {
                 data.error = err;
                 eventEmitter.emit('done');
             }
             else
             {
                 _.extend(clas, rows[0]);
                 data.result = classes;
             }

             countDone++;

             if(countDone === count)
             {
                 eventEmitter.emit('done');
             }
         });


     }

}

