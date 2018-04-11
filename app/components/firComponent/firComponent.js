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

	FirController.$inject = ['$scope', '$http', '$rootScope', '$state', '$transitions', 'REST_API', 'fileUpload', '$window'];

	function FirController($scope, $http, $rootScope, $state, $transitions, REST_API, fileUpload, $window) {
		var vm = this;
		vm.pageTitle = $state.$current.data.title;
		vm.ReportForm = {};
		$scope.$on('handleBroadcast', function () {
			vm.victimTempPhoto = $window.localStorage.getItem('tempPhoto');
		});
		var submitReport = function () {
			var file = vm.photo;
			var uploadUrl = "submit_report";
			var formToBeSubmit = vm.ReportForm;

			

			var fileData = new FormData();

			fileData.append('file', file);

			formToBeSubmit.photo = fileData;
			

			$http.post('submit_report', formToBeSubmit, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			}).then(function (res) {
				console.log(res)
			}, function (res) {
				console.log(res)
			});
		}
		vm.$onInit = function () {
			vm.submitReport = submitReport;
		};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
