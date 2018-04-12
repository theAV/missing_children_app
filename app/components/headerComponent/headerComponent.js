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
				userobj: '=',
			}
		});

	HeaderController.$inject = ['$scope', '$element', '$rootScope', '$state', '$transitions', 'REST_API', '$cookies', 'AuthenticationService'];

	function HeaderController($scope, $element, $rootScope, $state, $transitions, REST_API, $cookies, AuthenticationService) {
		var vm = this;
		////////////////
		vm.logo = "MCWA"
		vm.isuserauth = false;
		vm.userinfo;
		$rootScope.alerts = [];

		var logout = function () {
			REST_API.XHRCallApi('POST', 'get_logout').then(function (res) {
				var response_data = res.data;
				if (response_data.response_code === 200) {
					$rootScope.alerts.push({
						'type': 'active',
						'msg': response_data.message
					});					
					$rootScope.alerts = [];					
					AuthenticationService.removeCredentials();
					window.location = base_url;
				}else{
					AuthenticationService.removeCredentials();
					window.location = base_url;
				}

			}, function (res) {
				console.log('Wnkown Error');
			})

		}


		vm.$onInit = function () {
			if(vm.userobj.isAuthenticated){
				vm.logout = logout;
				vm.isuserauth = vm.userobj.isAuthenticated;
				vm.userinfo = vm.userobj.userinfo;
			}
		};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
