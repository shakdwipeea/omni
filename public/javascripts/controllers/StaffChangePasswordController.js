angular.module('omni')
.controller('StaffChangePasswordController', function  ($scope, StaffAppraisalFactory, $window, $state) {

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
		console.log('New Password', $scope.newPassword, $scope.confirmNewPassword);

		if ($scope.newPassword !== $scope.confirmNewPassword) {
			$scope.message = "Password Mismatch";
			return;
		};
		
		StaffAppraisalFactory.change_password({
			password: $scope.newPassword,
			teacher_id: _id
		})
		.success( function  (payload) {
			console.log('success', payload);
			$scope.message = "Password Updated";
		})
		.error( function  (reason) {
			console.log('reason', reason);
			$scope.message = "Error occured";
		})
	}
})