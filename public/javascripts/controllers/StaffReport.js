
angular.module('omni')
    .controller('StaffReport',function($scope,$http,StaffAppraisalFactory){
        $http.get('/get_appraisal_questions').success(function(data){ $scope.question=data;
            console.log($scope.question);
        });
        $scope.details=StaffAppraisalFactory.getStaffData();
        console.log($scope.details.data);
        $scope.teacher=$scope.details.data[0].first_name;
        $scope.department=$scope.details.data[0].department;
        $scope.designation=$scope.details.data[0].designation;
        $scope.subjectname=$scope.details.data.result[0].subject_name;
        $scope.subjectcode=$scope.details.data.result[0].subject_code;
        $scope.stype=$scope.details.data.result[0].type;
        $scope.appraised=$scope.details.data.result[0].appraised;
        $scope.total=$scope.details.data.result[0].total;
        console.log($scope.subjectname);

        console.log($scope.details.data.result[0].table + '_' + $scope.details.data[0].teacher_id);
        $http.post('/staff_report', {
            table: $scope.details.data.result[0].table + '_' + $scope.details.data[0].teacher_id,
            type: 'theory'
        })
            .then(function(data){ $scope.answers=data}) ;

    });
