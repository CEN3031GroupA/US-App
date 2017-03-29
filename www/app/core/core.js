angular.module('starter.core', ['ionic', 'login.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise(function ($injector, $location) {
    $injector.get('$state').transitionTo('app.not-found', null, {
      location: false
    });
  });

  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/core/menu.html',
      controller: 'LoginCtrl'
    })
    .state('app.not-found', {
      url: '/not-found',
      templateUrl: 'app/core/404.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('app.bad-request', {
      url: '/bad-request',
      templateUrl: 'app/core/400.view.html',
      data: {
        ignoreState: true
      }
    })
    .state('app.projects', {
      url: '/projects',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/projects.html',
          controller: 'PlaylistsCtrl'
        }
      }
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
