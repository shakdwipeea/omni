/**
 * Created by Akash on 23-02-2015.
 */
angular.module('omni')
    .factory('StaffAppraisalFactory', function ($http,$window) {

        var data;

        var login = function (credentials) {
          return  $http.post('/staff_login', credentials)
                    .then(function (response) {
                        data = response;
                        console.log(data);
                        $window.sessionStorage.teacher_id = data.data[0].teacher_id;
                        return data;
                    });
        }

        var new_class = function  (data) {
            // body...
            return $http.post('/new_class', data);
        }

        var change_password = function  (data) {
            return $http.post('/change_password', data);
        }

        return {
            loginStaff: login ,

            getStaffData: function () {
                if (data)
                {
                    return data;
                }    
            },

            new_class: new_class,

            change_password: change_password
        };
    });