angular.module('MCWA').service('REST_API', REST_API);
angular.module('MCWA').factory('AuthenticationService', AuthenticationService);
angular.module('MCWA').service('fileUpload', fileUpload);


function REST_API($q, $http) {
	return {
		XHRCallApi: XHRCallApi
	}

	function XHRCallApi(method, url, data) {
		var defer;
		var PostMethod = function () {
			var deferred = $q.defer();
			$http({
				method,
				url,
				data
			}).then(successCallback, errorCallback)

			function successCallback(res) {
				deferred.resolve(res);
			}

			function errorCallback(res) {
				deferred.reject(res);
			}
			return deferred.promise;
		};
		var GetMethod = function () {
			var deferred = $q.defer();
			$http({
				method,
				url
			}).then(successCallback, errorCallback)

			function successCallback(res) {
				deferred.resolve(res);
			}

			function errorCallback(res) {
				deferred.reject(res);
			}
			return deferred.promise;
		};

		if (method === "POST") {
			defer = PostMethod();
		} else if (method === "GET") {
			defer = GetMethod();
		} else {
			console.log('method is not defined');
		}
		return defer;
	};
}


AuthenticationService.$inject = ['$q', '$http', '$cookies', '$rootScope', 'REST_API', '$timeout', '$state'];

function AuthenticationService($q, $http, $cookies, $rootScope, REST_API, $timeout, $state) {
	var services = {};
	services.SetCredentials = SetCredentials;
	services.CheckLogInStatus = CheckLogInStatus;
	services.removeCredentials = removeCredentials;
	return services;

	function SetCredentials(data) {
		var session_data = data.data;
		$rootScope.global = {
			currentUser: {
				userSessionID: session_data.session_id,
				userData: session_data.usredata
			}
		}

		// $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;
		var cookieExp = new Date();
		cookieExp.setDate(cookieExp.getDate() + 7);
		$cookies.putObject('globals', $rootScope.global, {
			expires: cookieExp
		});
	};

	function CheckLogInStatus() {
		var islog;
		if ($cookies.get('globals') === undefined) {
			islog = false;
		} else {
			islog = true;
		};
		return islog;
	}

	function removeCredentials() {
		$cookies.remove("globals");
	}

};


fileUpload.$inject = ['$http'];

function fileUpload($http) {
	this.uploadFileToUrl = function (file, uploadUrl) {
		var fd = new FormData();
		fd.append('file', file);
		$http.post(uploadUrl, fd, {
			transformRequest: angular.identity,
			headers: {
				'Content-Type': undefined
			}
		}).then(function (res) {console.log(res)}, function (res) {console.log(res)});
	}
};
