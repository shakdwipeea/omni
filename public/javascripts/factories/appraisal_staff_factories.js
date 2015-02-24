/**
 * Created by Akash on 23-02-2015.
 */
angular.module('omni')
    .factory('StaffAppraisalFactory', function ($http) {

        var data;

        var login = function (credentials) {
          return  $http.post('/staff_login', credentials)
                    .then(function (response) {
                        data = response;
                        return data;
                    });
        }

        return {
            loginStaff: login ,

            getStaffData: function () {
                return data;
            }
        };
    });