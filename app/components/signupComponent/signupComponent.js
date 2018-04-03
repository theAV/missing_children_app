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
		vm.data = {
			'firstname': 'abhineet',
			'lastname': '',
			'email': 'abhineet.vispute@gmail.com',
			'pin': '123456',
			'mobile': '9893189689',
			'state': 'mp',
			'address': 'address',
			'password':'12345678'
		};
		vm.submit_user = function() {
			$http.post(
				'register',
				vm.data			
			).then(function(res) {
				console.log(res);
			},function (response) {
				console.log(response);
			})
		}
		vm.$onChanges = function (changesObj) {
            
        };
		vm.$onDestroy = function () {};
	}
})();
