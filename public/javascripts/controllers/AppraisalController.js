/**
 * Created by akash on 22/1/15.
 */
angular.module('omni')
    .controller('AppraisalController', function ($scope,$http,AppraisalFactory, $state, $window) {
        $scope.questions = [];
        $scope.alert_hide = true;
        $scope.result = false;

        $window.localStorage.givenAppraisal = 0;

    	var theoryQuestions = [],
            labQuestions = [];

    	$scope.active = {
    		id:0,
    		teacher: {
    			first_name: 'Akash'
    		}
    	};

    	$scope.teachers = AppraisalFactory.teacherDetails().data;

    	var ids = $scope.teachers.appraisal_ids;
        var count = $scope.teachers.appraisal_count;

        delete $scope.teachers.appraisal_count;
        delete $scope.teachers.appraisal_ids;

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
        });

        function updateQuestions(key) {
            $scope.alert_hide = true;
            // body...
            $scope.active = {
                id: key,
                teacher: $scope.teachers[key]
            };

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

            }
            else {
                updateQuestions(key);
            }
        };

        $scope.submit = function () {
	
            console.log("Submit");

           

            for(var i = 0; i < $scope.questions.length; i++)
            {
                if($scope.questions[i].answer === "" || $scope.questions[i].answer === null || !$scope.questions[i].answer )
                {
                    alert('Fill all the columns ');
                    return;
                }

            }

             $scope.alert_hide = false;
            $scope.result = true;

            _.extend($scope.teachers[$scope.active.id] , {
                appraisal_count: count,
                questions: $scope.questions,
                done: true,
                completed: 'grey'
            });

            var dataSubmit = {
                comments: $scope.comments,
                curTeacher: $scope.teachers[$scope.active.id],
                givenAppraisal: $window.localStorage.givenAppraisal,
                totalAppraisal: $scope.totalAppraisal
                
            };

            $scope.givenAppraisal++;
            $window.localStorage.givenAppraisal++;

            if($scope.givenAppraisal === $scope.totalAppraisal)
                        {   
                            alert("You have completed the appraisal");
                            $state.go('student_appraisal_login');
                        }

            AppraisalFactory.submit(dataSubmit)
                .then(function (response) {
		              console.log(response);
                    if(response.data)   
                    {
                        $scope.comments= "";
                        console.log("Submitted");
                        //$scope.alert_hide = false;
                      //  $scope.result = true;
                       console.log("Wtf u lukin at")
                        

                        

                    }
			
                }, function (reason) { 
                    console.log('An Error occured', reason);
                    console.log('Saving the data in local storage for later');

                    var pendingRequests = $window.localStorage.pendingRequests;
                    if(!pendingRequests) {
                        pendingRequests = [];
                    } else {
                        pendingRequests = JSON.parse(pendingRequests);
                    }



                    pendingRequests.push(dataSubmit);

                    $window.localStorage.pendingRequests = JSON.stringify(pendingRequests);

                    AppraisalFactory.setQueue(false);
                });
        };


});
