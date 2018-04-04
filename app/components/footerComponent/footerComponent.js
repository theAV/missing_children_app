(function () {
	'use strict';

	// Usage: main footer

	angular
		.module('MCWA')
		.component('footerComponent', {
			templateUrl: 'app/components/footerComponent/footerComponent.html',
			controller: FooterController,
			controllerAs: 'vm',
			bindings: {
				Binding: '=',
			},
		});

	FooterController.$inject = ['$scope', '$element', '$rootScope', '$state', '$transitions'];

	function FooterController($scope, $element, $rootScope, $state, $transitions) {
		var vm = this;
		////////////////


		vm.$onInit = function () {};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
