angular.module('omni')
	.factory('Appraisaldetails', function(){
		var dat;
		function setid(id){
			dat=id;
		}
		function getid(){
			return dat;
		}

		return {
			setid:setid,
			
			getid:getid

		}
	})