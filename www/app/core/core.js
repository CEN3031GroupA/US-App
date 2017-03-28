angular.module('starter.core', ['ionic', 'login.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/core/menu.html',
    controller: 'LoginCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'app/search.html'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'app/core/home.html'
        }
      }
    })
    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/home');
});
