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
				userData: '<'
			}
		});

	HeaderController.$inject = ['$scope', '$element', '$rootScope', '$state', '$transitions'];

	function HeaderController($scope, $element, $rootScope, $state, $transitions) {
		var vm = this;
		////////////////
		vm.logo = "MCWA"
		// console.log(vm.userData);
		vm.$onInit = function () {};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
