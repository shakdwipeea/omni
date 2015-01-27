angular.module('omni')
    .controller('StudentLoginController', function ($scope,$state,$http) {
        $scope.loginStudent = function () {
            console.log('hello');
            $http
            .post('/student_appraisal_login',{
                usn: $scope.student_usn
            })
            .success(function  (payload) {
                console.log(payload);
                // body...
            }).error(function  (error) {
                // body...
                console.log(error);
            })
        }
    })
