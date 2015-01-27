angular.module('omni')
    .controller('StudentLoginController', function ($scope,$state,$http,AppraisalFactory) {
        $scope.loginStudent = function () {
            console.log('hello');   
            var TeacherDetails = AppraisalFactory.getTeachers($scope.student_usn);
            if (TeacherDetails) {
                $state.go('student_appraisal_detail');
            }
        }
    })
