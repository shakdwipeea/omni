/**
 * Created by Akash on 25-02-2015.
 */
module.exports = function (damn, callback) {
    var mysql = require('mysql');

    var conn = require('./conn');

    var connection = mysql.createConnection(conn);

    var data = {
        error: true
    }

    console.log('table is', damn.table);

    //todo proper slice
    var semester = damn.table.slice(4,5);

    var query,count;

    query = 'SELECT appraisal_count FROM enable_table where semester = ?';

    query = mysql.format(query,[semester]);

    console.log(query);

    var q = connection.query(query, function (err, rows) {
        if(err)
        {
            console.log(err);
            callback(data);
        }
        else
        {

            count = rows[0].appraisal_count;

            if(damn.type === 'theory')
            {
                query = 'select distinct count(usn) as total, sum(appraisal_complete_1) as appraised';
                var i = 1;
                while (i < 16)
                {
                    query += ', sum(q' + i + '_' + count + ') as S' + i;
                    i++;
                }

                query += ' from ??';
            }
            else if (damn.type === 'lab')
            {
                query = 'select distinct count(usn) as total, sum(appraisal_complete_1) as appraised';
                var i = 1;
                while (i < 11)
                {
                    query += ', sum(q' + i + '_' + count + ') as S' + i;
                    i++;
                }

                query += ' from ??';
            }

            var table = 'appraisal_' + damn.table;

            query = mysql.format(query,[table]);

            connection.query(query, function (err, rows) {
                if(err)
                {
                    console.log('Error in staff_report',err);
                    callback(data);
                }
                else
                {
                    callback(rows[0]);
                }
            });

        }
    });

}
