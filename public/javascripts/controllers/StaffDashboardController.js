
angular.module('omni')
    .controller('StaffDashboardController', function($scope,$state,$http,StaffAppraisalFactory,$window){

        $scope.infor=StaffAppraisalFactory.getStaffData();
        // $scope.subject=$scope.infor.subject_name;
        // $scope.appraised=$scope.infor.appraised;
        // $scope.total=$scope.infor.total;
        // $scope.result=$scope.infor.result;
        // console.log("The value is "+$scope.result);
        console.log($scope.infor);

        $scope.logout = function  () {
			delete $window.sessionStorage.teacher_id;
			$state.go('staff_appraisal_login');
		}


    });