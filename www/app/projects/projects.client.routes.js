angular.module('starter.projects', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider
    .state('projects', {
      url: '/projects',
      abstract: true,
      templateUrl: '<ui-view/>'
    })

    .state('projects.list', {
      url: '',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/projects.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
});
