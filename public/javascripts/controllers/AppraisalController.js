/**
 * Created by akash on 22/1/15.
 */
angular.module('omni')
    .controller('AppraisalController', function ($scope,$http,AppraisalFactory) {
        $scope.questions = [];

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
    	delete $scope.teachers.teacher_ids;

    	console.log($scope.teachers);

    	AppraisalFactory.getQuestions()
    	.then(function  (questions) {
    		//$scope.questions = questions;
    		console.log("Questions are",questions);
    		for (var i = 0; i < questions.length; i++) {
    			if(questions[i].q_type === 'l') {
    				labQuestions.push(questions[i]);
    			} 
    			else if (questions[i].q_type === 't') {
    				theoryQuestions.push(questions[i]);
    			}

                questions[i].answer = '';

    		}

    		console.log("Theory Questions",theoryQuestions);
    		console.log("lab Questions",labQuestions);

    		updateQuestions(ids[0]);   	
        })

    function updateQuestions(key) {
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
        
        updateQuestions(key);
    }

    $scope.submit = function () {

        _.extend($scope.teachers[$scope.active.id] , {
            questions: $scope.questions,
            done: true
        });

        AppraisalFactory.submit($scope.teachers[$scope.active.id])
            .then(function (response) {
                if(response.data === 'true')
                {
                    $scope.result = true;
                    console.log('Hereh');
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
