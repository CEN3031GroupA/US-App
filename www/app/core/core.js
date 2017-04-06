angular.module('starter.core', ['ionic', 'user.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/core/menu.html',
      controller: 'UserCtrl'
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'app/users/views/login.html'
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
    /* Ideas */
    .state('app.list-ideas', {
      url: '/ideas',
      views: {
        'menuContent': {
          templateUrl: 'app/ideas/views/list-ideas.html'
        }
      }
    })
    .state('app.view-idea', {
      url: '/ideas/:ideaId',
      views: {
        'menuContent': {
          templateUrl: 'app/ideas/views/view-idea.html'
        }
      }
    })
    .state('app.create-idea', {
      url: '/create-idea',
      views: {
        'menuContent': {
          templateUrl: 'app/ideas/views/create-idea.html',
          controller: ''
        }
      }
    })
    /* Projects */
    .state('app.list-projects', {
      url: '/projects',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/list-projects.html',
          controller: 'ProjectsController'
        }
      }
    })
    .state('app.view-project', {
      url: '/projects/:projectId',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/view-project.html',
          controller: 'ProjectsController'
        }
      }
    })
    .state('app.create-project', {
      url: '/create',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project.html',
          controller: ''
        }
      }
    })
    .state('app.create-project-category', {
      url: '/category',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project-category.html',
          controller: ''
        }
      }
    })
    .state('app.create-project-team', {
      url: '/team',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project-team.html',
          controller: ''
        }
      }
    });
});
