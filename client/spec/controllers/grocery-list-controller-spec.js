/// <reference path="../../../typings/jasmine/jasmine.d.ts"/>
describe('GroceryListController', function(){
	
	var $rootScope;
	var $controller;
	var deferred;
	var $scope;
	var groceryList;
	
	var mockPromise = {
		data: 'foo'
	};
	
	beforeEach(function(){
		module('app');
	});
	
	beforeEach(inject(function(_$rootScope_, _$controller_, $q){
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		deferred = $q.defer();
	}));
		
	beforeEach(function(){
		$scope = {};
		
		groceryList = {
			fetchList : function(){},
			addItem : function(item){}
		};
		
		$controller('GroceryListController', {$scope: $scope, groceryList: groceryList});
		
		spyOn(groceryList, 'fetchList').andReturn(deferred.promise);
		spyOn(groceryList, "addItem");
	});
	
	describe('groceryListController.fetchList', function(){
		
		afterEach(function(){
			groceryList.fetchList.reset();
		});

		it('should call groceryList.fectchList', function(){
			
			$scope.fetchList();
			
			expect(groceryList.fetchList).toHaveBeenCalled();
		});
		
		it('should set items on success', function(){
			deferred.resolve(mockPromise);
						
			$scope.fetchList();
			$rootScope.$digest();
			
			expect($scope.items).toBe('foo');
			
		});	
	});
	
	describe('groceryListController.addItem', function(){
		
		var item = { name: "foo" };
		
		it('should call groceryList.addItem', function(){
			$scope.addItem(item);
			
			expect(groceryList.addItem).toHaveBeenCalledWith(item);
		});
	});
	
		
});