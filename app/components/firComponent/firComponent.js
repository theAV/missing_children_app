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

	FirController.$inject = ['$scope', '$http', '$rootScope', '$state', '$cookies', '$timeout', 'REST_API', 'fileUpload', '$window', 'AuthenticationService'];

	function FirController($scope, $http, $rootScope, $state, $cookies, $timeout, REST_API, fileUpload, $window, AuthenticationService) {
		var vm = this;

		var submitReport = function () {
			var file = vm.photo,
				uploadUrl = "submit_report";

			if (AuthenticationService.CheckLogInStatus()) {
				// var currentUser = JSON.parse($cookies.get('globals')).currentUser,
				// 	currentUserID = currentUser.userData.id;
				// vm.ReportForm.creater = currentUserID;
				vm.ReportForm.creater = $rootScope.creater;
				
				var fileData = new FormData();

				for (var key in vm.ReportForm) {
					if (vm.ReportForm.hasOwnProperty(key)) {
						fileData.append(key, vm.ReportForm[key]);
					}
				}

				fileData.append("file", file);

				$http.post('submit_report', fileData, {
					headers: {
						'Content-Type': undefined
					}
				}).then(function (res) {
					var response = res.data;
					if (res.response_code === 200) {
						
					}
					$timeout(function () {
						$state.go('reports');
					}, 1500);
					$rootScope.alerts.push({
						'type': 'active',
						'msg': response.message
					});
				}, function (res) {
					console.log(res)
				});
			} else {
				$rootScope.alerts.push({
					'type': 'active',
					'msg': 'You are not login.'
				});

				$timeout(function () {
					window.location = base_url + '/login';
				}, 1500);

			}

		}
		vm.$onInit = function () {
			vm.submitReport = submitReport;
			vm.pageTitle = $state.$current.data.title;
			vm.ReportForm = {};
			$rootScope.alerts = [];
			$scope.$on('handleBroadcast', function () {
				vm.victimTempPhoto = $window.localStorage.getItem('tempPhoto');
			});
			vm.ReportForm.age = 1;

			vm.inlineOptions = {
				maxDate: new Date(),
				showWeeks: true
			};

			vm.maxDate = new Date();
			vm.ageCriteria = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
			vm.ReportForm.gender = 'male';
			vm.ReportForm.spectacles = 'no';
			vm.ReportForm.mentally_ill = 'no';
			vm.ReportForm.dif_abled = 'no';
		};
		vm.$onChanges = function (changesObj) {};
		vm.$onDestroy = function () {};
	}
})();
