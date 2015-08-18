var mysql = require('mysql'),
	conn = require('../database/conn'),
	connection = mysql.createConnection(conn);


//data has keys app, usn and count
//callback err, flag	
module.exports = function  (data, callback) {
	var query = "SELECT appraisal_complete_" + data.count + " FROM ?? WHERE usn = ?";
	query = mysql.format(query, [data.app, data.usn]);
	console.log('QUery', query)

	connection.query(query, function  (err, rows) {
		if (err) {
			callback(true, null);
		} else if(rows) {
			var completeFromDb = rows[0]['appraisal_complete_' + data.count];
			var flag = completeFromDb === 1 ? true : false;
			callback(null, flag);
		} else {
			callback(true, null);
		}
	})
}