(function () {
	'use strict';

	// Usage: main header

	angular
		.module('MCWA')
		.component('headerComponent', {
			templateUrl: 'app/components/headerComponent/headerComponent.html',
			controller: HeaderController,
			controllerAs: 'vm',
			bindings: {
				isauthenticated: '=',
			}
		});

	HeaderController.$inject = ['$scope', '$element', '$rootScope', '$state', '$transitions', 'REST_API', '$cookies', 'AuthenticationService'];

	function HeaderController($scope, $element, $rootScope, $state, $transitions, REST_API, $cookies, AuthenticationService) {
		var vm = this;
		////////////////
		vm.logo = "MCWA"
		$rootScope.alerts = [];
		
		var logout = function(){
			REST_API.XHRCallApi('POST', 'get_logout' ).then(function(res){
				var response_data = res.data;
				if(response_data.response_code === 200){
					$rootScope.alerts.push({
						'type': 'active',
						'msg': response_data.message
					});
					$rootScope.alerts = [];
					AuthenticationService.removeCredentials()
					$state.go('/');
				}
				
			}, function(res){
				$state.go('/');
			})
			
		}
		
		// $scope.$on('authcheck', function(event, userAuthData) {
		// 	vm.authenticated = userAuthData;
		// });
		vm.$onInit = function(){
			console.log(vm.isauthenticated)
			vm.logout = logout;
			
		};
		vm.$onChanges = function (changesObj) {	
		};
		vm.$onDestroy = function () {};
	}
})();
