
angular.module('omni')
    .controller('StaffDashboardController', function($scope,$state,$http,StaffAppraisalFactory,$window){

        $scope.infor=StaffAppraisalFactory.getStaffData();
        
        if (!$scope.infor) {
            delete $window.sessionStorage.teacher_id;
            delete $window.sessionStorage.table;
            delete $window.sessionStorage.sub;

            $state.go('staff_appraisal_login');
            return;
        };

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
            delete $window.sessionStorage.table;
            delete $window.sessionStorage.sub;
            
			$state.go('staff_appraisal_login');
		}

        $scope.viewReport = function  (sub_code, sub_table_this) {

            $window.sessionStorage.table = sub_table_this;

            $window.sessionStorage.sub = sub_code;

             console.log('Stored',$window.sessionStorage.table);
            $state.go('staff_report');
        }


    });