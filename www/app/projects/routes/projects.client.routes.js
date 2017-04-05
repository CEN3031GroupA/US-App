/*'use strict';

angular.module('starter.projects').config(['$stateProvider',
    function ($stateProvider) {
      $stateProvider
        .state('projects', {
          abstract: true,
          url: '/projects',
          template: '<ui-view/>'
        })
        .state('app.list-projects', {
          url: '',
          views: {
            'menuContent': {
              templateUrl: 'app/projects/client/views/list-projects.html',
              controller: 'ProjectsController'
            }
          }
        })
        .state('app.view-project', {
          url: '/projects/:projectId',
          views: {
            'menuContent': {
              templateUrl: 'app/projects/client/views/view-project.html',
              controller: 'ProjectsController'
            }
          }
        })
        .state('app.create-project', {
          url: '/create-project',
          views: {
            'menuContent': {
              templateUrl: 'app/projects/client/views/create-project.html',
              controller: ''
            }
          }
        })
        .state('app.create-project-category', {
          url: '/project-category',
          views: {
            'menuContent': {
              templateUrl: 'app/projects/client/views/create-project-category.html',
              controller: ''
            }
          }
        })
        .state('app.create-project-team', {
          url: '/project-team',
          views: {
            'menuContent': {
              templateUrl: 'app/projects/client/views/create-project-team.html',
              controller: ''
            }
          }
        });
    }
]);
*/
