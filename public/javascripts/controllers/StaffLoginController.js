/**
 * Created by akash on 22/1/15.
 */
angular.module('omni')
    .controller('StaffLoginController', function ($scope, StaffAppraisalFactory, $state) {
        $scope.loginStaff = function () {
            if ($scope.staff_user_id && $scope.staff_user_password )
            {
                StaffAppraisalFactory.loginStaff({
                    id: $scope.staff_user_id,
                    password: $scope.staff_user_password
                })
                    .then(function (response) {
                        if (response.data.error === false)
                        {
                            $state.go('staff_appraisal_dashboard');
                        }
                    }, function (reason) {
                        console.log('Error occured', reason);
                    })
            }
        }
    });
