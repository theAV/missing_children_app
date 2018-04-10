(function () {
	'use strict';

	// Usage: main header

	angular
		.module('MCWA')
		.component('firComponent', {
			templateUrl: 'app/components/firComponent/firComponent.html',
			controller: FirController,
			controllerAs: 'vm',
			bindings: {
				userData: '<'
			}
		});

	FirController.$inject = ['$scope', '$rootScope', '$state', '$transitions'];

	function FirController($scope, $rootScope, $state, $transitions) {
		var vm = this;
		vm.pageTitle = $state.$current.data.title;
		vm.firForm = {};
		var submitForm = function(){
			console.log(vm.firForm);
		}
		vm.$onInit = function(){
			vm.submitForm = submitForm;
		};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
