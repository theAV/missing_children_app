(function () {
	'use strict';

	// Usage: main header

	angular
		.module('MCWA')
		.component('reportsComponent', {
			templateUrl: 'app/components/reportsComponent/reportsComponent.html',
			controller: ReportController,
			controllerAs: 'vm',
			bindings: {
				userData: '<'
			}
		});

	ReportController.$inject = ['$scope', '$element', '$rootScope', '$state', '$transitions'];

	function ReportController($scope, $element, $rootScope, $state, $transitions) {
		var vm = this;
		
		vm.$onInit = function(){
			
		};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
