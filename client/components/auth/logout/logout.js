var app = angular.module("Order.Auth");

app.controller("LogoutController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {
    console.log('im here');
    $scope.logout = function(user) {
      UserService.logout(user).then(function(response) {
        $location.path("/main");
      }, function (response) {
            alert(response.data.message);
      });
    };
  }]);
