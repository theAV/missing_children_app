(function () {
	'use strict';

	angular
		.module('MCWA')
		.component('loginComponent', {
			templateUrl: 'app/components/loginComponent/loginComponent.html',
			controller: loginController,
			controllerAs: 'vm',
			bindings: {
				'userData': '<',
			},
		});

	loginController.$inject = ['$element', '$rootScope', '$state', '$http', 'REST_API', '$timeout', 'AuthenticationService'];

	function loginController($element, $rootScope, $state, $http, REST_API, $timeout, AuthenticationService) {
		var vm = this;
		
		vm.pageTitle = $state.$current.data.title;
		vm.loginuser = {};
		$rootScope.alerts = [];
		
		vm.do_login = function () {
			REST_API.XHRCallApi('POST', 'get_login', vm.loginuser).then(function (res) {
				var response_data = res.data;

				if (response_data.response_code === 200) {
					$rootScope.alerts.push({
						'type': 'active',
						'msg': response_data.message
					});
					
					
					
					AuthenticationService.SetCredentials(response_data);
	
					
				} else if (response_data.response_code === 500 && typeof (response_data.error) === 'object') {
					$rootScope.alerts.push({
						'type': 'active',
						'msg': response_data.error.password
					});
				} else {
					$rootScope.alerts.push({
						'type': 'active',
						'msg': response_data.message
					});
				}

			}, function (response) {
				console.log(response);
			})
		};
		
		vm.$onInit = function(){};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
