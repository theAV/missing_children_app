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
				url: "/",
				views: {
					'': {
						template:'<div ui-view="header"></div><main ui-view="content"></main><div ui-view="footer"></div>',
					},
					'content@root': {
						templateUrl: path + 'home.html'
					},
					'header@root':{
						template: '<header-component></header-component>'
					},
					'footer@root':{
						template: '<footer-component></footer-component>'
					}
				},
				isAuthRequired: false,
				data: {
					title: 'root'
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path + 'headerComponent/headerComponent.js',
								component_path + 'footerComponent/footerComponent.js'
							],
							cache: true
						}).then(function success(args) {
							return args;
						}, function error(err) {
							return err;
						});
					}],
					userData: function ($cookies) {
						var cookies = $cookies.get('userSessionData');
						var data = 'abhi';
						return data;
					}
				}
			})
			.state('signup', {
				parent: 'root',
				url: 'signup',
				views: {
					'content@root': {
						template: '<signup-component></signup-component>'
					}
				},
				isAuthRequired: false,
				data: {
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
				url: 'login',
				views: {
					'content@root': {
						template: '<login-component></login-component>'						
					}
				},
				isAuthRequired: false,
				data: {
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
					}]
				}

			}).state('dashboard', {
				url: 'dashboard',
				views: {
					'content@root': {
						template: '<login-component></login-component>'
					}
				},
				isAuthRequired: true,
				data: {
					title: 'Dashboard'
				}
			})

		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$httpProvider.interceptors.push('MyInterceptor');
		// use the HTML5 History API
		$locationProvider.html5Mode(true)
	}

	Run.$inject = ['$rootScope', 'Constantconfig', '$cookies','AuthenticationService'];

	function Run($rootScope, Constantconfig, $cookies, AuthenticationService) {
		$rootScope.appName = Constantconfig.appName;
		$rootScope.appVersion = Constantconfig.appVersion;

		$rootScope.closeAlert = function (index) {
			$rootScope.alerts.splice(index, 1);
		};

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
			
			var loggedIn = $rootScope.global;
			
			AuthenticationService.CheckLogInStatus().then(function(status){

			}, function(status){
				
			});
		});
	}

})();
