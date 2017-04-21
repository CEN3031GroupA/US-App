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
      templateUrl: 'app/core/menu.html'
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
    .state('app.create-idea', {
      url: '/create-idea',
      views: {
        'menuContent': {
          templateUrl: 'app/ideas/views/create-idea.html',
          controller: ''
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
    .state('app.edit-idea', {
      url: '/ideas/:ideaId/edit',
      views: {
        'menuContent': {
          templateUrl: 'app/ideas/views/edit-idea.html'
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
    .state('app.edit-project', {
      url: '/projects/:projectId/edit',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/edit-project.html',
          controller: 'ProjectsController'
        }
      }
    })
    /* Articles */
    .state('app.create-article', {
      url: '/articles/create',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-article.html'
        }
      }
    })
    .state('app.list-articles', {
      url: '/articles',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/list-articles.html'
        }
      }
    })
    .state('app.view-article', {
      url: '/articles/:articleId',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/view-article.html'
        }
      }
    })
    .state('app.edit-article', {
      url: '/articles/:articleId/edit',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/edit-article.html'
        }
      }
    })
    /* FAQS */
    .state('app.list-faqs', {
      url: '/faqs',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/list-faqs.html'
        }
      }
    })
    .state('app.respond-faq', {
      url: '/faqs/:faqId',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/respond-faq.html'
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
    /* Admin Categories */
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
      url: '/admin/categories',
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
    /* Admin Vote View */
    .state('app.view-vote-results', {
      url: '/admin/vote-results',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/view-vote-results.html',
          controller: ''
        }
      }
    })
    /* Admin Events */
    .state('app.list-events', {
      url: '/admin/events',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/list-events.html',
          controller: ''
        }
      }
    })
    .state('app.create-event', {
      url: '/admin/events/create',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/create-event.html',
          controller: ''
        }
      }
    })
    .state('app.edit-event', {
      url: '/admin/events/edit',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/edit-event.html',
          controller: ''
        }
      }
    })
    .state('app.manage-event', {
      url: '/admin/events/manage',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/manage-events.html',
          controller: ''
        }
      }
    });
});
