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
				reportdata: '<'
			}
		});

	ReportController.$inject = ['$scope', '$element', '$rootScope', '$state', '$transitions'];

	function ReportController($scope, $element, $rootScope, $state, $transitions) {
		var vm = this;
		
		vm.$onInit = function(){
			vm.reportsArr = vm.reportdata.data.reports;
			vm.isCurrentIsOwner = $rootScope.creater;
		};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
