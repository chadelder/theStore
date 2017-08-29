var app = angular.module('theStore', ['ui.router','Order.Auth', 'CreateOrder']);
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/main',
    //abstract: true,
    templateUrl: 'static/view/main.html',
    //controller: 'AppCtrl'
  })
  .state('catered', {
  url: '/catered',
  templateUrl: 'static/view/catered.html',
  controller: 'OrderController',
  })
  .state('vieworder', {
  url: '/vieworder',
  templateUrl: 'components/orders/order.html',
  controller: 'OrderController'
  })
  .state('edit', {
    url: '/edit/:id',
    templateUrl: 'static/view/edit_order.html',
    controller: 'OrderController'
  })
  .state('delete', {
    url: '/vieworder',
    templateUrl: 'components/orders/order.html',
    controller: 'OrderController'
  })
  .state('send', {
    url: '/send',
    templateUrl: 'components/orders/order.html',
    controller: 'OrderController'
  })

  $urlRouterProvider.otherwise('/main');
});

/*app.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      //console.log(next.name);
      if (next.name !== 'login' && next.name !== 'register') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});*/
