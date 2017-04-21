angular.module('starter.articles', ['ionic'])

.controller('ArticleCtrl', function ($scope, $http, $stateParams, $location, $rootScope, $window, ActiveEvent) {
  $scope.create = function (isValid) {
    $scope.error = null;

    if (!isValid) {
      $scope.$broadcast('show-errors-check-validity', 'articleForm');

      return false;
    }

    // Create new Article object
    var article = {
      title: this.title,
      content: this.content
    };

    $http.post(config.api + '/articles', article)
      .success(function (data) {
        $location.path('app/article/' + data._id);
        // Clear form fields
        $scope.title = '';
        $scope.content = '';      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.remove = function (article) {
    $http.delete(config.api + '/articles/' + article._id)
      .success(function () {
        $location.path('app/articles');
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.update = function (article) {
    $http.put(config.api + '/articles/' + article._id)
      .success(function() {
        $location.path('app/articles/' + article._id);
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.find = function () {
    $http.get(config.api + '/articles')
      .success(function (data) {
        $scope.articles = data;
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.findOne = function () {
    $http.get(config.api + '/articles/' + $stateParams.articleId)
      .success(function (data) {
        $scope.article = data;
      })
      .error(function () {
        console.log('data error');
      })
  };
});

