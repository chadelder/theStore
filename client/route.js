var app = angular.module('theStore', ['ui.router']);
  //console.log(app);
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('main', {
    url: '/main',
    //abstract: true,
    templateUrl: 'static/view/main.html',
    controller: 'AppCtrl'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'static/userAuth/login.html',
    controller: 'LoginCtrl'
  })
  .state('register', {
  url: '/register',
  templateUrl: 'static/userAuth/register.html',
  controller: 'RegisterCtrl'
  })
  .state('catered', {
  url: '/catered',
  templateUrl: 'static/view/catered.html',
  controller: 'InsideCtrl',
  //controller: 'clientController'
  })
  .state('vieworder', {
  url: '/vieworder',
  templateUrl: 'static/view/view_order.html',
  controller: 'InsideCtrl'
  })
  .state('edit', {
    url: '/edit/:id',
    templateUrl: 'static/view/edit_order.html',
    controller: 'clientController'
  })
  .state('delete', {
    url: '/vieworder',
    templateUrl: 'static/view/view_order.html',
    controller: 'clientController'
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
