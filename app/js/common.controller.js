(function () {
	'use strict';

	angular
		.module('MCWA').controller('commonController', commonController);

	commonController.$inject = [];

	function commonController(){
        var vm = this; 
		vm.authenticated = true;
		
    }
})();
