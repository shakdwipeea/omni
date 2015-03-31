angular.module('omni')
    .controller('StudentLoginController', function ($scope,$state,$http,AppraisalFactory) {
        $scope.loginStudent = function () {
            console.log('hello');   
            AppraisalFactory.getTeachers($scope.student_usn.toLowerCase())
            .then(function  (data) {
                console.log("Data ", data);
                if (data) {
                    $state.go('student_appraisal_detail');
                };
            }, function (reason) {
                    console.log('Reason', reason);
                    alert(reason.data.err);
                });
        }
    })
