angular.module('MCWA').service('REST_API', REST_API);
angular.module('MCWA').factory('AuthenticationService', AuthenticationService);
angular.module('MCWA').factory('MyInterceptor', MyInterceptor);

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


AuthenticationService.$inject = ['$q', '$http', '$cookies', '$rootScope', 'REST_API'];

function AuthenticationService($q, $http, $cookies, $rootScope, REST_API) {
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
		console.log($cookies.get('globals'))
		$cookies.remove("globals");
		console.log($cookies.get('globals'))
	}
};

function MyInterceptor() {
	return {
		request: function (config) {
			//   console.log(config)
			return config;
		},

		requestError: function (config) {
			//   console.log(config)
			return config;
		},

		response: function (res) {
			//   console.log(res)
			return res;
		},

		responseError: function (res) {
			//   console.log(res)
			return res;
		}
	}
}
