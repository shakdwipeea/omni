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
		;


});	