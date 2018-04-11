
angular.module('MCWA').directive('fileModel', fileModel);


fileModel.$inject = ['$parse', '$rootScope', '$timeout', '$window'];

function fileModel($parse, $rootScope, $timeout, $window) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind('change', function () {
				scope.$apply(function () {
					var reader = new FileReader();
					reader.onload = function(e) {
						$timeout(function(){
							$rootScope.victimTempPhoto = e.target.result;							
							$window.localStorage.setItem('tempPhoto', e.target.result);
							$rootScope.$broadcast('handleBroadcast');
						})
					}
					reader.readAsDataURL(element[0].files[0]);
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
};

