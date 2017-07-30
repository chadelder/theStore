var app = angular.module("Order.Auth");

app.controller("LoginController", ["$scope", "$location", "UserService", function ($scope, $location, UserService) {

    $scope.login = function (user) {
        UserService.login(user).then(function (response) {
            $location.path("/catered");
        }, function (response) {
            alert(response.data.message);
        });
    }
}]);
