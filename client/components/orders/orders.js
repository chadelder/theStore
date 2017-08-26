var app = angular.module("CreateOrder", []);

app.service("OrderService", ["$http", function ($http) {
    this.getOrders = function () {
        return $http.get("/api/order").then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };
    /*this.createOrder = function (order) {
        return $http.post("/api/order", $scope.order).then(function (response) {
            return response.data;
        }, function (response) {
            alert("Error " + response.status + ": " + response.statusText);
        });
    };*/
}]);

app.controller("OrderController", ["$scope", "$http", "$state", "$stateParams", "OrderService", function ($scope, $http, $state, $stateParams, OrderService) {
    $scope.order = {};
    $scope.orders = [];

      // define and immediately invoke this function when the
      // page loads to get the list of todos from the server
    $scope.getOrders = function() {
    (function getOrders() {
        OrderService.getOrders().then(function (orders) {
            $scope.orders = orders;
        });
    })();
  };
    $scope.addOrder = function() {
		console.log($scope.order);
		$http.post('/api/order', $scope.order).then(function(response){
			$state.go('catered');
      //$state.reload();
		});
    // Only three orders
	/*$scope.count = 0;
		$scope.counter = function( x ){
				$scope.count += x;
		}*/
		$scope.limit = function( y ){
		return ( $scope.count == y ) ? true : false;
  }
	 };

   // Update Order
	$scope.updateOrder = function(){
		var orderId = $stateParams.id;
		$http.put('/api/order/'+orderId, $scope.order).then(function(response){
			$state.go('vieworder');
			console.log(response);
		});
	}
	// Remove Order
	$scope.removeOrder = function(orderId){
		$http.delete('/api/order/'+orderId).then(function(response){
			$state.go('vieworder');
			//window.location.href='#/addOrder';
		});
  };

  $scope.user = {};
  $scope.users = [];
  $scope.getUser = function(){
		$http.get('/auth').then(function(users){
			$scope.users = users.data;
			console.log($scope.users);
		})
};

  }]);
