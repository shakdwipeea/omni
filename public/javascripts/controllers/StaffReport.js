
angular.module('omni')
    
    .controller('StaffReport',function($scope,$window,$http,StaffAppraisalFactory,$state, $stateParams){
        $scope.lab=[];
        $scope.theory=[];
        $scope.quest=[];

        $scope.total = 0;
        $scope.appraised = 0;

        $scope.scores = [];

         $scope.details=StaffAppraisalFactory.getStaffData();

        if (!$window.sessionStorage.teacher_id || !$scope.details) {

            delete $window.sessionStorage.teacher_id;
            delete $window.sessionStorage.table;
            delete $window.sessionStorage.sub;

            $state.go('staff_appraisal_login');
            return;
        };


        $scope.subject = $window.sessionStorage.sub;

        var sync = 0;
        var question = [];
        var scores = [];

        var type = '';


        if ($window.sessionStorage.table.slice(-3,-2) === 'l') 
        {
            type = 'lab';
        } 
        else 
        {
            type = 'theory';
        }

        
        $http.get('/get_appraisal_questions').success(function(data){ 
            sync++;

            question = data;

            console.log('Question newborn', question);
        
            for(var i=0; i < question.length; i++) 
            {
                if(question[i].q_type === 'l')
                {
                    $scope.lab.push(question[i].q_text);
                }
                else
                {
                    $scope.theory.push(question[i].q_text);
                }
            }

            if (type === 'lab') 
            {
                question = $scope.lab;
            }
            else if (type === 'theory') 
            {
                question = $scope.theory;
            };

            sync_now();
        
        });



        $http.post('/staff_report',{

            table: $window.sessionStorage.table + '_' + $window.sessionStorage.teacher_id,
            type: type

        }).success( function  (data) {

            sync++;

            console.log('Data in Staff Report cont. ', data)
            $scope.total = data.total;
            $scope.done = data.appraised;

            delete data.total;
            delete data.appraised;

            scores = _.toArray(data);

            sync_now();
        });
        
       
        console.log($scope.details.data);
        
        $scope.stype = type;
        console.log($scope.stype);
        
        $scope.teacher=$scope.details.data[0].first_name;
        $scope.department=$scope.details.data[0].department;
        $scope.designation=$scope.details.data[0].designation;

        $scope.subjectname = $window.sessionStorage.sub;

        function sync_now () {
            if (sync === 2)
            {
                
                console.log('scores', scores)
                $scope.question = _.object(question, scores);
                console.log('question', question);
            };
        }
        
    });