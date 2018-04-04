(function () {
	'use strict';

	angular
		.module('MCWA')
		.component('signupComponent', {
			templateUrl: 'app/components/signupComponent/signupComponent.html',
			controller: signupController,
			controllerAs: 'vm',
			bindings: {
				Binding: '=',
			},
		});

	signupController.$inject = ['$element', '$rootScope', '$state', '$transitions', '$http', 'REST_API'];

	function signupController($element, $rootScope, $state, $transitions, $http, REST_API) {
		var vm = this;

		vm.pageTitle = $state.$current.data.title;
		vm.newUser = {};
		$rootScope.alerts = [];
		vm.add = function(){
			$rootScope.alerts.push({ 'type': 'active', 'msg': 'asdas' });
		}
		vm.submit_user = function () {
			
			REST_API.XHRCallApi('POST', 'register', vm.newUser).then(function (res) {
				
				vm.newUser = {};
			}, function (response) {
				console.log(response);
			})
			
		}
		vm.$onChanges = function (changesObj) {

		};
		vm.$onDestroy = function () {};
	}
})();
