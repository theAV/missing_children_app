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


angular.module('MCWA').service('REST_API', REST_API);
