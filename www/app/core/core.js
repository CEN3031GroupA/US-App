angular.module('starter.core', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

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
  .state('app.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'app/browse.html',
        controller: 'PlaylistsCtrl'
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
   $urlRouterProvider.otherwise('/app/home');
 });
