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

	signupController.$inject = ['$element', '$rootScope', '$state', '$transitions', '$http'];

	function signupController($element, $rootScope, $state, $transitions, $http) {
		var vm = this;
		////////////////
        vm.text = "signup"
		vm.submit_user = function() {
			$http({
				method : "GET",
				url :'users'
			}).then(function(res) {
				console.log(res);
			},function myError(response) {
				console.log(response);
			})
		}
		vm.$onChanges = function (changesObj) {
            
        };
		vm.$onDestroy = function () {};
	}
})();
