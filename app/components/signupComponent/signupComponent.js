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

	signupController.$inject = ['$element', '$rootScope', '$state', '$transitions', '$http', 'REST_API', '$timeout'];

	function signupController($element, $rootScope, $state, $transitions, $http, REST_API, $timeout) {
		var vm = this;

		vm.pageTitle = $state.$current.data.title;
		vm.newUser = {};
		$rootScope.alerts = [];
		
		vm.submit_user = function () {
			
			REST_API.XHRCallApi('POST', 'register', vm.newUser).then(function (res) {
				var data = res.data;
				
				if(data.response_code===200){		
					$rootScope.alerts.push({ 'type': 'active', 'msg': data.message });
										
					vm.newUser = {};
					vm.signupform.$setPristine();
      				vm.signupform.$setUntouched();
					$timeout(function(){
						$state.go('login');
					}, 1000);
				}else{
					$rootScope.alerts.push({ 'type': 'active', 'msg': data.message });
				}
			}, function (response) {
				console.log(response);
			})
			
		}
		vm.$onChanges = function (changesObj) {

		};
		vm.$onDestroy = function () {};
	}
})();
