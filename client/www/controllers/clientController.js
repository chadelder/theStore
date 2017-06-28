angular.module('theStore')

//var theStore = angular.module('theStore');

app.controller('clientController', ['$scope', '$http', '$location', '$state', '$stateParams', function($scope, $http, $location, $state, $stateParams){
	console.log('clientController loaded...');

	// getOrders
	$scope.getOrders = function(){
		$http.get('/api/orders').then(function(orders){
			$scope.orders = orders.data;
			console.log($scope.orders);
		})
};

	// get Order by ID
	$scope.getOrder = function(){
		var id = $stateParams.id;
		$http.get('/api/orders/'+id).then(function(response){
			$scope.order = response;
			console.log(response);
		});
	};

	// add Order
	$scope.addOrder = function(){
		console.log($scope.order);
		$http.post('/api/orders/', $scope.order).then(function(response){
			$state.go('catered');
			//window.location.href='#/addOrder';
		});
	}

	// Only three orders
	$scope.count = 0;
		$scope.counter = function( x ){
				$scope.count += x;
		}
		$scope.limit = function( y ){
		return ( $scope.count == y ) ? true : false;
		}


	// Update Order
	$scope.updateOrder = function(){
		var id = $stateParams.id;
		$http.put('/api/orders/'+id, $scope.order).then(function(response){
			$state.go('vieworder');
			console.log(response);
		});
	}

	// Remove Order
	$scope.removeOrder = function(id){
		$http.delete('/api/orders/'+id).then(function(response){
			$state.go('vieworder');
			//window.location.href='#/addOrder';
		});
	}
}]);

	// Open new tab for tweeter feed...
	/*$scope.redirectVCUhoops = function () {
        $state.open('https://www.google.com', '_blank');
    };*/
