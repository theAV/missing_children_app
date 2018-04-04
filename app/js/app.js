(function () {
	'use strict';
	/**
	 * MCWA - Missing Children Web App
	 */
	angular.module('MCWA', ['ui.router', 'oc.lazyLoad', 'ngSanitize', 'ngMessages', 'ui.bootstrap']);

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
					'@': {
						template: '<header-component></header-component><main ui-view="content"></main><footer-component></footer-component>',
					},
					'content@root': {
						templateUrl: path + 'home.html'
                    }
                },
                data: {
                   title: 'root'
                },
				resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path+'headerComponent/headerComponent.js',
								component_path+'footerComponent/footerComponent.js'
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
				url: 'signup',
				views: {
					'content@root': {
						template: '<signup-component></signup-component>'
					}
				},
                data: {
                    title: 'Sign Up'
                },
                resolve: {
					loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load({
							files: [
								component_path+'signupComponent/signupComponent.js'
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
						template: '<p>login</p>',
						controller: function () {
							console.log('in login')
						}
					}
                },
                data: {
                    title: 'login Up'
                }

			})

			$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		// use the HTML5 History API
		$locationProvider.html5Mode(true)
	}

	Run.$inject = ['$rootScope', 'Constantconfig'];

	function Run($rootScope, Constantconfig) {
		$rootScope.appName = Constantconfig.appName;
		$rootScope.appVersion = Constantconfig.appVersion;
	}

})();
