angular.module('omni')
.factory('AppraisalFactory', function  ($http) {

	var _questions = function  () {
		$http.get('/get_appraisal_questions')
		.success( function  (payload) {
			return payload;
		})
		.error( function  (reason) {
			console.log("Error :", reason);
			throw new Error('Error');
		})
	}

	var _teacherDetails = function  () {
		// body...
		$http.post('/student_appraisal_login',{usn: usn})
		.success({ function  (payload) {
			return payload;
		}})
		.error( function  (reason) {
			console.log("Error", err);
			return null;
			throw new Error(err);

		})
	}

	var getQuestions = function  () {
		return _questions;
	};

	var getTeacherDetails = function  (usn) {
		return _teacherDetails;
	}

	return {
		get: getQuestions,
		getTeachers: getTeacherDetails
	}
});