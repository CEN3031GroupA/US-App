'use strict';

angular.module('app.projects', ['ionic'])

.config(function($stateProvider) {
  $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsCtrl'
      });
      .state('project', {
        url: '/projects/:projectId',
        views: {
          'menuContent': {
            templateUrl: 'app/projects/projects.html',
            controller: 'ProjectsCtrl'
          }
        }
    });
});

.controller('ProjectsCtrl', function($scope) {
  $scope.projects = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
