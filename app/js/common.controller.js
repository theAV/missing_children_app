(function () {
	'use strict';

	angular
		.module('MCWA').controller('commonController', commonController);

	commonController.$inject = ['$scope', '$rootScope', '$state', '$transitions', 'REST_API', '$cookies', 'AuthenticationService'];;

	function commonController($scope, $rootScope, $state, $transitions, REST_API, $cookies, AuthenticationService){
		var vm = this;
		vm.userobj = {};
		vm.userobj.isAuthenticated = false;
		if(AuthenticationService.CheckLogInStatus()){
			vm.userobj.isAuthenticated = true;
			vm.userobj.userinfo = JSON.parse($cookies.get('globals')).currentUser.userData;
		}
		
    }
})();
