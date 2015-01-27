module.exports = function  (res) {
	var mysql = require('mysql');
	var conn = require('./conn.js');

	var connection = mysql.createConnection(conn);

	var query = "SELECT * FROM question_map";

	connection.query(query, function  (err, rows) {
		if (err) {
			console.log("Error is ", err);
			res.json({
				error: err
			});
		} 
		else {
			console.log("Rows are",rows);
			res.json(rows);
		}
	});

}