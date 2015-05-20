module.exports = function  (teacherDetails, callback) {
	var mysql = require('mysql');
	var conn = require('./conn');

	var response = {};

	var connection = mysql.createConnection(conn);

	var query = "UPDATE teacher_details SET error_flag = 1, error_comments = ? WHERE teacher_id = ?";

	query = mysql.format(query,[teacherDetails.comments, teacherDetails.teacher_id]);

	console.log('Query is ', query);

	connection.query(query, function  (err, rows) {
		if (err) {
			console.log('Error occured',err);

			response = {
				err: true,
				message: 'Error in query'
			}

		}

		else {
			response = {
				err: false,
				message: 'Completed succesfully'
			}
		}


		callback(response);
	})
}