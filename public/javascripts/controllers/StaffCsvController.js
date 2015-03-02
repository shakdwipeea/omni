angular.module('omni')
.controller ('StaffCsvController', function  ($scope,$state,StaffAppraisalFactory,$window) {


	
        if (!$window.sessionStorage.teacher_id) {

            delete $window.sessionStorage.teacher_id;
            delete $window.sessionStorage.table;
            delete $window.sessionStorage.sub;

            $state.go('staff_appraisal_login');
            return;
        };


	var _id = $window.sessionStorage.teacher_id;

	console.log('a');
	$scope.disable = true;



	$scope.disableLab = function  () {
		console.log($scope.sub_type);
		if ($scope.sub_type === 'l') 
		{
			$scope.disable = false;
		}
		else
		{
			$scope.disable = true;
		}
	}

	$scope.message = '';

	$scope.submit = function  () {
		// body...
		var data = {
			teacher_id: _id,
			dept: $scope.dept,
			sem: $scope.sem,
			sec: $scope.sec,
			code: $scope.sub_code,
			type: $scope.sub_type,
			batch: $scope.batch_no
		}


		console.log(data);

		StaffAppraisalFactory.new_class(data)
			.then(function  (payload) {
				console.log(payload);
				$scope.message = 'Class Added';
			}, function  (reason) {
				console.log(reason);
			})
	}

	$scope.logout = function  () {
		delete $window.sessionStorage.teacher_id;
        delete $window.sessionStorage.table;
        delete $window.sessionStorage.sub;


		$state.go('staff_appraisal_login');
	}

});
