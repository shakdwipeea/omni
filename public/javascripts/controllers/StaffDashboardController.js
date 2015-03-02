
angular.module('omni')
    .controller('StaffDashboardController', function($scope,$state,$http,StaffAppraisalFactory,$window){

        $scope.infor=StaffAppraisalFactory.getStaffData();
       
        console.log($scope.infor);

        console.log(typeof $scope.infor.data.result);

        $scope.infor.data.result = _.map($scope.infor.data.result,(function  (sub) {
            sub.code = sub.table;
            sub.code = sub.code.slice(8,14);
            return sub;
        }));

        console.log($scope.infor.data.result);

        $scope.logout = function  () {
			delete $window.sessionStorage.teacher_id;
			$state.go('staff_appraisal_login');
		}


    });