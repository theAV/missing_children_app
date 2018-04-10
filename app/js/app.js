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
			.state('login', {
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
					}]
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
			})
			.state('root', {
				// url: '/',
				views: {
					'@': {
						template: '<div ui-view="header" class="component"></div><div class="component" ui-view></div><div class="component" ui-view="footer"></div>',
						controller: 'commonController',
						controllerAs: 'vm'
					},
					'header@root': {
						template: '<header-component userobj="vm.userobj"></header-component>',
						controller: 'commonController',
						controllerAs: 'vm',
						resolve: {
							userobj: function () {
								return vm.userobj;
							}
						}
					},
					'footer@root': {
						template: '<footer-component></footer-component>',
						controller: 'commonController',
						controllerAs: 'vm'
					}
				},
			})

			.state('home', {
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
					isauthenticated: function (AuthenticationService) {
						return AuthenticationService.CheckLogInStatus();
					}
				}
			})
			.state('reports', {
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
			.state('fir',{
				parent: 'root',
				url:'/firs',
				component: 'firComponent',
				data: {
					isAuthRequired: true,
					title: 'Lodge Report'
				},
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path + 'firComponent/firComponent.js'
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
		
		// use the HTML5 History API
		$locationProvider.html5Mode(true)
	}

	Run.$inject = ['$rootScope', '$state', 'Constantconfig', '$cookies', 'AuthenticationService', '$transitions'];

	function Run($rootScope, $state, Constantconfig, $cookies, AuthenticationService, $transitions) {
		$rootScope.appName = Constantconfig.appName;
		$rootScope.appVersion = Constantconfig.appVersion;

		$rootScope.closeAlert = function (index) {
			$rootScope.alerts.splice(index, 1);
		};
		var isUserLogin = AuthenticationService.CheckLogInStatus();
		$transitions.onSuccess({}, function(transitions, toState) {
			var state_data = $state.$current.data,
				authRequire = state_data.isAuthRequired;
			if(authRequire && !isUserLogin){
				$state.go('login');
			}
			var after_authRestrict = ['login', 'signup'];
			if(after_authRestrict.indexOf($state.$current.name)!== -1 && isUserLogin){
				$state.go('home');
			}
		});
	}

})();
