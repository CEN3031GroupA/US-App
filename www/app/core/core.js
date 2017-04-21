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
    .state('app.create-idea', {
      url: '/create-idea',
      views: {
        'menuContent': {
          templateUrl: 'app/ideas/views/create-idea.html',
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
        }
      }
    })
    .state('app.create-project-category', {
      url: '/projects/category',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project-category.html',
        }
      }
    })
    .state('app.create-project-team', {
      url: '/projects/team',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/create-project-team.html',
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
          templateUrl: 'app/articles/views/create-article.html'
        }
      }
    })
    .state('app.list-articles', {
      url: '/articles',
      views: {
        'menuContent': {
          templateUrl: 'app/articles/views/list-articles.html'
        }
      }
    })
    .state('app.view-article', {
      url: '/articles/:articleId',
      views: {
        'menuContent': {
          templateUrl: 'app/articles/views/view-article.html'
        }
      }
    })
    .state('app.edit-article', {
      url: '/articles/:articleId/edit',
      views: {
        'menuContent': {
          templateUrl: 'app/articles/views/edit-article.html'
        }
      }
    })
    /* FAQS */
    .state('app.list-faqs', {
      url: '/faqs',
      views: {
        'menuContent': {
          templateUrl: 'app/faqs/views/list-faqs.html'
        }
      }
    })
    .state('app.respond-faq', {
      url: '/faqs/:faqId',
      views: {
        'menuContent': {
          templateUrl: 'app/faqs/views/respond-faq.html'
        }
      }
    })
    /* Admin */
    .state('app.admin', {
      url: '/admin',
      views: {
        'menuContent': {
          templateUrl: 'app/users/views/admin/admin-home.html',
        }
      }
    })
    /* Admin Categories */
    .state('app.create-category', {
      url: '/admin/create-category',
      views: {
        'menuContent': {
          templateUrl: 'app/categories/views/create-category.html',
        }
      }
    })
    .state('app.list-category', {
      url: '/admin/categories',
      views: {
        'menuContent': {
          templateUrl: 'app/categories/views/list-category.html',
        }
      }
    })
    .state('app.edit-category', {
      url: '/admin/edit-category',
      views: {
        'menuContent': {
          templateUrl: 'app/categories/views/edit-category.html',
        }
      }
    })
    /* Admin Vote View */
    .state('app.view-vote-results', {
      url: '/admin/vote-results',
      views: {
        'menuContent': {
          templateUrl: 'app/projects/views/view-vote-results.html',
        }
      }
    })
    /* Admin Events */
    .state('app.list-events', {
      url: '/admin/events',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/list-events.html',
        }
      }
    })
    .state('app.create-event', {
      url: '/admin/events/create',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/create-event.html',
        }
      }
    })
    .state('app.edit-event', {
      url: '/admin/events/edit',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/edit-event.html',
        }
      }
    })
    .state('app.manage-event', {
      url: '/admin/events/manage',
      views: {
        'menuContent': {
          templateUrl: 'app/events/views/manage-events.html',
        }
      }
    });
});
