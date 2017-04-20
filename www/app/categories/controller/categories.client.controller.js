angular.module('starter.category', ['ionic', 'starter.config'])

.controller('CategoryCtrl', function ($scope, $state, $stateParams, $location, $http) {

  /* Create Category */
  $scope.create = function () {
      var questions = [];
      for (var i = 0; i < $scope.questions.length; i++) {
        questions.push($scope.questions[i].content);
      }

      var eventCategory = {
        title: this.title,
        description: this.description,
        questions: questions
      };

      $http.post(config.api + '/admin/eventCategories', eventCategory)
        .success(function () {
          $location.path('app/admin/categories');
          $scope.title = '';
        })
        .error(function () {
          console.log('data error');
        })
    };

    /* Update Category */
    $scope.update = function () {
      var eventCategory = $scope.eventCategory;

      var questions = [];
      for (var i = 0; i < $scope.questions.length; i++) {
        questions.push($scope.questions[i].content);
      }

      eventCategory.questions = questions;

      $http.put(config.api + '/admin/eventCategories/' + eventCategory._id)
        .success(function() {
          $location.path('app/admin/eventCategories');
        })
        .error(function () {
          console.log('data error');
        })
    };

    /* Get list of created categories */
    $scope.find = function() {
      $http.get(config.api + '/admin/eventCategories')
        .success(function(data) {
          $scope.eventCategories = data;
        })
        .error(function(){
          console.log('data error');
        })
    };

    /* Find a category listing */
    $scope.findOne = function () {
      $http.get(config.api + '/admin/eventCategories/' + $stateParams.eventCategoryId)
        .success(function (data) {
          $scope.eventCategory = data;

          $scope.questions = [];
          for (var i = 0; i < $scope.eventCategory.questions.length; i++) {
            $scope.questions.push({
              num: i + 1,
              content: $scope.eventCategory.questions[i]
            });
          }
        })
        .error(function () {
          console.log('data error');
        })
    };

    /* Delete a category */
    $scope.remove = function (eventCategory) {
      $http.delete(config.api + '/admin/eventCategories/' + eventCategory._id)
        .success(function() {
          $location.path('app/admin/eventCategories');
        })
        .error(function () {
          console.log('data error');
        })
    };

    $scope.deleteQuestion = function (questionIndex) {
      // TODO UPDATE QUESTION.NUM
      var questions = [];
      for (var i = 0; i < $scope.questions.length; i++) {
        if (i !== questionIndex - 1) {
          questions.push($scope.questions[i]);
        }
      }

      $scope.questions = questions;
    };

    $scope.initCreate = function() {
      $scope.questions = [
        {
          num: 1,
          content: ''
        }
      ];
    };

    $scope.addQuestion = function () {
      $scope.questions.push({
        num: $scope.questions.length + 1,
        content: ''
      });
    };
  }
);
