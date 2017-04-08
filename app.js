(function () {
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService);

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var ctrl = this;

		ctrl.searchTerm = '';
		ctrl.sendRequest = function(){
			var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

			promise.then(function(response){
				//console.log(response.data);
			})
			.catch(function() {
				console.log("Something went wrong!");
			})
		}
	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http) {
		var service = this;

		var found = [];
		service.getMatchedMenuItems = function (searchTerm){
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			})
			.then(function(response){
				for(var i=0;i<response.data.menu_items.length;i++) {
					var menuItemDescription = response.data.menu_items[i].description;
					if(menuItemDescription.toLowerCase().indexOf(searchTerm) !== -1)
						found.push(response.data.menu_items[i]);
				}
				for( var i =0;i<found.length;i++)
					console.log("Item : " + found[i].name);
				return response;
			});

		}
	}

})();