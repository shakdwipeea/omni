angular.module('omni')
.controller('HomeController',function  ($scope,$state) {
	// body...
	$scope.signin = function () {
		// body...
		$state.go('student.dashboard');
	};
});