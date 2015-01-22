angular.module('omni',['ui.router'])

.config(function($stateProvider,$urlRouterProvider,$httpProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'/templates/home.ejs',
			controller:'HomeController'
		})
		.state('student',{
			url:'/student',
			templateUrl:'/templates/student.ejs'
		})
		.state('student.dashboard',{
			url:'/dash',
			templateUrl:'/templates/student.dashboard.ejs'
		})
		.state('student.profile',{
			url:'/profile',
			templateUrl:'/templates/student.prof.ejs'
		})
		.state('student.subject',{
			url:'/subject',
			templateUrl:'/templates/student.sub.ejs'
		})
		.state('student_appraisal_detail', {
			url:'/appraisal',
			templateUrl:'/templates/appraisal_detail.ejs',
			controller:'AppraisalController'
		})
		.state('student_appraisal_login',{
			url:'/student_login',
			templateUrl:'/templates/appraisal_index.ejs',
			controller:'StudentLoginController'
		})
		.state('staff_appraisal_login', {
			url:'/staff_login',
			templateUrl:'/templates/appraisal_login.ejs',
			controller:'StaffLoginController'
		})
		;


});	
