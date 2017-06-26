angular.module('theStore')

app.controller('LoginCtrl', function($scope, AuthService, $state) { //$ionicPopup
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.login = function(msg) {
    AuthService.login($scope.user).then(function() {
      $state.go('catered');
    }, function() {
      $scope.alerts = [
        {type: 'danger', throw: 'errMsg'},
      ]
      });

      $scope.closeAlert = function(index) {
        $scope.users = '';
    };
  };
  //};
});

app.controller('RegisterCtrl', function($scope, AuthService, $state) { //$ionicPopup
  $scope.user = {
    name: '',
    password: ''
  };

  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('login');
      //console.log(msg);
      $scope.alerts = [
        {type: 'noDanger', throw: 'success'},
      ]
    }, function(errMsg) {
      console.log(errMsg);
      $scope.alerts = [
        {type: 'danger', throw: errMsg},
      ]
    });
  };
})

app.controller('InsideCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  console.log('InsideCtrl loaded');
  $scope.destroySession = function() {
    AuthService.logout();
  };

  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
      console.log(result);
    });
  };

  $scope.addOrder = function(){
		//console.log($scope.user_id);
		$http.post('/api/orders/', $scope.order).then(function(response){
			$state.go('catered');
			//window.location.href='#/addOrder';
		});
	}

  /*$scope.addOrder = function(){
		//console.log($scope.user_id);
		$http.post('/api/orders/', $scope.order).then(function(response){
			$state.go('catered');
			//window.location.href='#/addOrder';
		});
	}*/


  $scope.getOrders = function(){
		$http.get(API_ENDPOINT.url + '/orders').then(function(orders){
			$scope.orders = orders.data;
			console.log($scope.orders);
		})
};


  $scope.logout = function() {
    AuthService.logout();
    $state.go('main');
  };
});

app.controller('AppCtrl', function($scope, $state, AuthService, AUTH_EVENTS) { //$ionicPopup
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('main');
  });
});
