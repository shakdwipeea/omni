angular.module('omni')
.factory('AppraisalFactory', function  ($http) {

	var _questions = [];

	var _teacherDetails = [];

	var getTeacherDetails = function  (usn) {
		// body...
		return $http.post('/student_appraisal_login',{usn: usn})
	};

	var getQuestions = function  () {
		return $http.get('/get_appraisal_questions');
	};

    var sendFeedback = function (data) {
        return $http.post('/feedback', data);
    };

	/*var getTeacherDetails = function  (usn) {
		return _teacherDetails(usn);
	}*/

	return {
		teacherDetails: function  () {
			return _teacherDetails;
		},

		getTeachers: function  (usn) {
	
		return getTeacherDetails(usn)	
			.then(function  (result) {
				console.log("Success here", result);
				_teacherDetails = result;
				return _teacherDetails.data;
			});
		},

		getQuestions: function  () {
			return getQuestions()
				.then(function  (result) {
					console.log("Questions ", result);
					_questions = result;
					return _questions.data;
				});
		},

        submit: sendFeedback
	};
});