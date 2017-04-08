(function () {
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService);

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var ctrl = this;

		ctrl.sendRequest = function(){
			var promise = MenuSearchService.getMatchedMenuItems();

			promise.then(function(response){
				console.log(response.data);
			})
			.catch(function() {
				console.log("Something went wrong!");
			})
		}
	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http) {
		var service = this;

		service.getMatchedMenuItems = function (){
			var response = $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			});

			return response; 
		}
	}

})();