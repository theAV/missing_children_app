(function () {
	'use strict';
	/**
	 * MCWA - Missing Children Web App
	 */
	angular.module('MCWA', ['ui.router', 'oc.lazyLoad', 'ngSanitize', 'ngMessages', 'ui.bootstrap', 'ngCookies']);

	const path = base_url + 'app/partials/';
	const component_path = base_url + 'app/components/';

	angular.module('MCWA').constant('Constantconfig', {
		'urlpath': base_url,
		'appName': 'Missing Children Web App',
		'appVersion': '1.0'
	});

	angular.module('MCWA').config(Config);
	angular.module('MCWA').run(Run);

	Config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$ocLazyLoadProvider', '$httpProvider'];

	function Config($stateProvider, $urlRouterProvider, $locationProvider, $ocLazyLoadProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state('root', {
				views: {
					controller:function(){

					},
					'content': {
						abstract: true,
						template: '<main ui-view="" class="flex-box"></main>'
					},
					'header': {
						template: '<header-component></header-component>',
						// resolve: {
						// 	isauthenticated: function(AuthenticationService){
						// 		return AuthenticationService.CheckLogInStatus();
						// 	}
						// }
					},
					'footer': {
						template: '<footer-component></footer-component>'
					}
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path + 'headerComponent/headerComponent.js',
								component_path + 'footerComponent/footerComponent.js',
								'app/js/common.controller.js'
							],
							cache: true
						}).then(function success(args) {
							return args;
						}, function error(err) {
							return err;
						});
					}]
				}
			})
			.state('/', {
				parent: 'root',
				url: '/',
				component: 'homeComponent',
				data: {
					isAuthRequired: false,
					title: 'Home',
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path + 'homeComponent/homeComponent.js'
							],
							cache: true
						}).then(function success(args) {
							return args;
						}, function error(err) {
							return err;
						});
					}],
					isauthenticated: function(AuthenticationService){
						return AuthenticationService.CheckLogInStatus();
					}
				}
			})
			.state('signup', {
				parent: 'root',
				url: '/signup',
				component: 'signupComponent',
				data: {
					isAuthRequired: false,
					title: 'Sign Up'
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path + 'signupComponent/signupComponent.js'
							],
							cache: true
						}).then(function success(args) {
							return args;
						}, function error(err) {
							return err;
						});
					}]
				}
			}).state('login', {
				parent: 'root',
				url: '/login',
				component: 'loginComponent',
				data: {
					isAuthRequired: false,
					title: 'Log In'
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path + 'loginComponent/loginComponent.js'
							],
							cache: true
						}).then(function success(args) {
							return args;
						}, function error(err) {
							return err;
						});
					}],
					authenticat: function () {
						return "abhi"
					}
				}
			}).state('reports', {
				parent: 'root',
				url: '/reports',
				component: 'reportsComponent',
				data: {
					isAuthRequired: true,
					title: 'Reports'
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path + 'reportsComponent/reportsComponent.js'
							],
							cache: true
						}).then(function success(args) {
							return args;
						}, function error(err) {
							return err;
						});
					}]
				}
			})

		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$httpProvider.interceptors.push('MyInterceptor');
		// use the HTML5 History API
		$locationProvider.html5Mode(true)
	}

	Run.$inject = ['$rootScope', '$state', 'Constantconfig', '$cookies', 'AuthenticationService'];

	function Run($rootScope, $state, Constantconfig, $cookies, AuthenticationService) {
		$rootScope.appName = Constantconfig.appName;
		$rootScope.appVersion = Constantconfig.appVersion;
		$rootScope.loggedin = false;

		$rootScope.closeAlert = function (index) {
			$rootScope.alerts.splice(index, 1);
		};

		if ($cookies.get('globals') === undefined) {
			$state.go('/');
		}


		// $rootScope.$on('$locationChangeStart', function (event, next, current) {
		// 	AuthenticationService.CheckLogInStatus();
		// });

		$rootScope.$on('$viewContentLoaded', function (event, next, current) {
			var isAuthRequired = true;
			
			// if ($cookies.get('globals') === undefined && isAuthRequired ) {
			// 	$state.go('/');
			// }
		});

	}

})();
