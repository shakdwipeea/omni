/**
 * Created by akash on 22/1/15.
 */
angular.module('omni')
    .controller('AppraisalController', function ($scope,$http,AppraisalFactory) {
        $scope.questions = [];
        $scope.alert_hide = true;
        $scope.result = false;

    	var theoryQuestions = [],
            labQuestions = [];

    	$scope.active = {
    		id:0,
    		teacher: {
    			first_name: 'Akash'
    		}
    	};
    	
    	$scope.teachers = AppraisalFactory.teacherDetails().data;

    	var ids = $scope.teachers.teacher_ids;
        var count = $scope.teachers.appraisal_count;

        delete $scope.teachers.appraisal_count;;
    	delete $scope.teachers.teacher_ids;

    	console.log($scope.teachers);

        $scope.totalAppraisal = _.size($scope.teachers);

        $scope.givenAppraisal = 0;

    	AppraisalFactory.getQuestions()
    	.then(function  (questions) {
    		//$scope.questions = questions;
    		console.log("Questions are",questions);
    		for (var i = 0; i < questions.length; i++) 
            {
    			if(questions[i].q_type === 'l') 
                {
    				labQuestions.push(questions[i]);
    			} 
    			else if (questions[i].q_type === 't')
                {
    				theoryQuestions.push(questions[i]);
    			}

                questions[i].answer = '';

    		}

    		console.log("Theory Questions",theoryQuestions);
    		console.log("lab Questions",labQuestions);

    		updateQuestions(ids[1]);   	
        })

    function updateQuestions(key) {
        $scope.alert_hide = true;
        // body...
        $scope.active = {
            id: key,
            teacher: $scope.teachers[key]
        }
        
        console.log("Active questions ", $scope.active.id);
        console.log("Active questions type", $scope.active.teacher.type);
        
        if ($scope.active.teacher.type === 'l') {
            $scope.questions = labQuestions;
        } 
        else if ($scope.active.teacher.type === 't') {
            $scope.questions = theoryQuestions;
        }
        
        console.log("Questions ", $scope.questions);

        $scope.questions.map(function (question) {
            question.answer = '';
        });

        $scope.result = false;
    }

    $scope.loadQuestion = function (key) {
        // body...
        console.log("key is ", key);

        if($scope.teachers[key].done)
        {
            return;
        }
        else {
            updateQuestions(key);
        }
    }

    $scope.submit = function () {


        _.extend($scope.teachers[$scope.active.id] , {
            appraisal_count: count,
            questions: $scope.questions,
            done: true,
            completed: 'grey'
        });

        AppraisalFactory.submit($scope.teachers[$scope.active.id])
            .then(function (response) {
                if(response.data === 'true')
                {
                    
                    console.log("Submitted");
                    $scope.alert_hide = false;
                    $scope.result = true;
                   // console.log("Working---Jayanth")
                    $scope.givenAppraisal++;
                }
            }, function (reason) {
                console.log('An Error occured');
            });
    };

    $scope.finalSubmit = function () {
        console.log("Final Submit")
        AppraisalFactory.submit($scope.teachers)
            .then(function (response) {

                if (response.data === true)
                {
                    $scope.result = true;
                }
            }, function (reason) {
                console.log('Error occurred', reason);
            });
    };

});
