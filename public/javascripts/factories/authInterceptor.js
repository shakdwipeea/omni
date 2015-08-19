angular.module('omni')
.factory('authInterceptor',function ($rootScope,$q,$window, $injector) {

	function completeFucks() {
        	console.log("complete pending reqe");
        	var reqs = $window.localStorage.pendingRequests
        	if (reqs) {
        		reqs.forEach(function  (req) {

        		})
        	}
        }

	return {
		request: function (config) {
			return config;
		},
		response: function (response) {

			if (response.status === 200) {
				//user not authorized
				var AppraisalFactory = $injector.get('AppraisalFactory')
				AppraisalFactory.completePendingRequest();
			} 
			return response || $q.when(response);
		}
	};
});