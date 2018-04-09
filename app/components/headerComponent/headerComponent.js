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
				isuserauth: '=',
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
					$state.go('home');
				}
				
			}, function(res){
				$state.go('/');
			})
			
		}
		
	
		vm.$onInit = function(){
			console.log(vm.isuserauth)
			vm.logout = logout;
			
		};
		vm.$onChanges = function (changesObj) {	
		};
		vm.$onDestroy = function () {};
	}
})();
