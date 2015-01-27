angular.module('omni')
    .controller('StudentLoginController', function ($scope,$state,$http) {
        $scope.loginStudent = function () {
            console.log('hello');
            $http({
                method:'POST',
                url:'/student_appraisal_login',
                body:{
                    usn: $scope.usn
                }
            }).success(function  (payload) {
                console.log(payload);
                // body...
            }).error(function  (error) {
                // body...
                console.log(error);
            })
        }
    })
