(function() {
	'use strict';

angular.module('starter.projects', ['ionic'])

.config(function($stateProvider) {
  $stateProvider
    .state('app.projects', {
      url: '/projects',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/projects.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
  });
});
