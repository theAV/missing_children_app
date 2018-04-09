(function () {
	'use strict';

	angular
		.module('MCWA').controller('commonController', commonController);

	commonController.$inject = ['$scope', '$rootScope', '$state', '$transitions', 'REST_API', '$cookies', 'AuthenticationService'];;

	function commonController($scope, $rootScope, $state, $transitions, REST_API, $cookies, AuthenticationService){
		var vm = this;
		alert(0)
		if ($cookies.get('globals') === undefined) {
			vm.rootAtuthenticated = false;
			$rootScope.rootAtuthenticated = false;
		}else{
			vm.rootAtuthenticated = true;
			$rootScope.rootAtuthenticated = true;
		}
		
    }
})();
