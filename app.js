(function () {
	'use strict';

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', function(){
		var ddo = {
			templateUrl: 'shoppingList.html',
		    
		  };

		return ddo;
	});

	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var ctrl = this;

		ctrl.searchTerm = '';
		ctrl.found = [];
		ctrl.sendRequest = function(){
			if(ctrl.searchTerm != ''){
				var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);

				promise.then(function(response){
					ctrl.found = response;
				})
				.catch(function() {
					console.log("Something went wrong!");
				});
			}
		}

		ctrl.removeItem = function(itemIndex){
			MenuSearchService.removeItem(itemIndex);
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
				return found;
			});

		}

		service.removeItem = function (itemIndex) {
    		found.splice(itemIndex, 1);
    	}
  };

})();