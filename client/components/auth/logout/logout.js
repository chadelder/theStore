var app = angular.module("Order.Auth");

app.controller("LogoutController", ["UserService", function (UserService) {
    UserService.logout();
}]);
