
angular.module('omni')
    .controller('StaffDashboardController', function($scope,$http,StaffAppraisalFactory){

        $scope.infor=StaffAppraisalFactory.getStaffData();
        // $scope.subject=$scope.infor.subject_name;
        // $scope.appraised=$scope.infor.appraised;
        // $scope.total=$scope.infor.total;
        // $scope.result=$scope.infor.result;
        // console.log("The value is "+$scope.result);
        console.log($scope.infor);


    });