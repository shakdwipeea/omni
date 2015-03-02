module.exports = function  (data, callback) {
	var mysql = require('mysql');
	//cse_6_b_12cs64l_2
	var _ = require('underscore');

	var conn = require('./conn');

	var connection = mysql.createConnection(conn);

	var query = "SELECT * FROM teacher_details WHERE teacher_id = ?";

	query = mysql.format(query,[data.teacher_id]);

	var value = data.dept + '_' + data.sem + '_' + data.sec 
		+ '_' + data.code;

	if (data.type === 'l') {
		value += data.type + '_' + data.batch; 
	};

	var index = 1;

	var q = connection.query(query, function  (err, rows) {
		if (err) {
			
			console.log(err);
			callback({
				err: err
			});

		} else{

			for (var i = 1; i < 11; i++) {
				if (rows[0]['class_' + i]) {
					index++;
				};
			};
		};
	});

	q.on('end', function  () {
		query = "UPDATE teacher_details SET ?? = ? WHERE teacher_id = ?";

		query = mysql.format(query,['class_' + index,value,data.teacher_id]);

		console.log(query);
		connection.query(query, function  (err, rows) {
			if (err) {
				console.log(err);	
			} else{
				callback({
					err: false,
					message: 'fuck you'
				})
			};
		})
	})
}