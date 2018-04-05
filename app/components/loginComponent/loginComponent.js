(function () {
	'use strict';

	angular
		.module('MCWA')
		.component('loginComponent', {
			templateUrl: 'app/components/loginComponent/loginComponent.html',
			controller: loginController,
			controllerAs: 'vm',
			bindings: {
				'asda': '<',
			},
		});

	loginController.$inject = ['$element', '$rootScope', '$state', '$http', 'REST_API', '$timeout', '$cookies'];

	function loginController($element, $rootScope, $state, $http, REST_API, $timeout, $cookies) {
		var vm = this;
		
		vm.pageTitle = $state.$current.data.title;
		vm.loginuser = {};
		$rootScope.alerts = [];

		console.log(vm.asda);;
		
		vm.do_login = function () {
			REST_API.XHRCallApi('POST', 'get_login', vm.loginuser).then(function (res) {
				var data = res.data;

				if (data.response_code === 200) {
					$rootScope.alerts.push({
						'type': 'active',
						'msg': data.message
					});
					
					$cookies.put('userSessionID', data.data.session_id);
					$cookies.putObject('userSessionData', data.data.userdata);
					
				} else if (data.response_code === 500 && typeof (data.error) === 'object') {
					$rootScope.alerts.push({
						'type': 'active',
						'msg': data.error.password
					});
				} else {
					$rootScope.alerts.push({
						'type': 'active',
						'msg': data.message
					});
				}

			}, function (response) {
				console.log(response);
			})
		};
		
		vm.$onChanges = function (changesObj) {

		};
		vm.$onDestroy = function () {};
	}
})();
