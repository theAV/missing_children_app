(function () {
	'use strict';

	angular
		.module('MCWA')
		.component('homeComponent', {
			templateUrl: 'app/components/homeComponent/homeComponent.html',
			controller: homeController,
			controllerAs: 'vm',
			bindings: {
				isauthenticated: '='
			},
		});

	homeController.$inject = ['$scope', '$rootScope', '$state', '$transitions', '$http', 'REST_API', '$timeout', 'AuthenticationService'];

	function homeController($scope, $rootScope, $state, $transitions, $http, REST_API, $timeout, AuthenticationService) {
		var vm = this;

		vm.pageTitle = $state.$current.data.title;
		
		// $scope.$on('authcheck', function(event, userAuthData) {
		// 	vm.authenticated = userAuthData;
		// });
		
		vm.$onInit = function () {
		};
		vm.$onChanges = function (changesObj) {

		};
		vm.$onDestroy = function () {};
	}
})();
