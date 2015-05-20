angular.module('omni')
.controller('StaffFlagController', function  ($scope, StaffAppraisalFactory, $window, $state, $http) {

	$scope.message = '';

  if (!$window.sessionStorage.teacher_id) {

      delete $window.sessionStorage.teacher_id;
      delete $window.sessionStorage.table;
      delete $window.sessionStorage.sub;

      $state.go('staff_appraisal_login');
      return;
  };


	var _id = $window.sessionStorage.teacher_id;


	$scope.submit = function  () {
		$http.post('/flag_admin', {
      data: {
       teacher_id: _id,
       comments: $scope.comments 
      }
		}).then(function (data) {
      console.log("Data after submitting", data);
      $state.go('staff_appraisal_dashboard');
    })
	};

        $scope.logout = function  () {
            delete $window.sessionStorage.teacher_id;
            delete $window.sessionStorage.table;
            delete $window.sessionStorage.sub;

            $state.go('staff_appraisal_login');
        };
});