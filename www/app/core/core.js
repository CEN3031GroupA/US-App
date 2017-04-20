angular.module('starter.core', ['ionic', 'user.controllers'])

.controller('CoreCtrl', function($scope, $window) {
  $scope.user = JSON.parse($window.localStorage.getItem("currentUser"));
})

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
    .state('app.create-project', {
      url: '/projects/create',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project.html',
          controller: ''
        }
      }
    })
    .state('app.create-project-category', {
      url: '/projects/category',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project-category.html',
          controller: ''
        }
      }
    })
    .state('app.create-project-team', {
      url: '/projects/team',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project-team.html',
          controller: ''
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
    /* Admin */
    .state('app.admin', {
      url: '/admin',
      views: {
        'menuContent': {
          templateUrl: 'app/users/views/admin/admin-home.html',
          controller: ''
        }
      }
    })
    .state('app.create-category', {
      url: '/admin/create-category',
      views: {
        'menuContent': {
          templateUrl: 'app/categories/views/create-category.html',
          controller: ''
        }
      }
    })
    .state('app.list-category', {
      url: '/admin/list-category',
      views: {
        'menuContent': {
          templateUrl: 'app/categories/views/list-category.html',
          controller: ''
        }
      }
    })
    .state('app.edit-category', {
      url: '/admin/edit-category',
      views: {
        'menuContent': {
          templateUrl: 'app/categories/views/edit-category.html',
          controller: ''
        }
      }
    })
    .state('app.view-vote-results', {
      url: '/admin/vote-results',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/view-vote-results.html',
          controller: ''
        }
      }
    });
});
