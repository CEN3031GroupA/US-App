angular.module('starter.ideas', ['ionic', 'starter.config'])

.controller('IdeasController', function ($scope, $http, $stateParams, $location, $rootScope) {
  if (!$rootScope.activeIdea) {
    $rootScope.activeIdea = {
      description: {}
    };
  }

  $scope.saveIdeaInfo = function () {
    $rootScope.activeIdea.title = this.title;
    $rootScope.activeIdea.description.long = this.details;
  };

  $scope.create = function () {
    var idea = $rootScope.activeIdea;

    $http.post(config.api + '/ideas', idea)
      .success(function (data) {
        $location.path('app/ideas/' + data._id);
        $rootScope.activeIdea = null;
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.remove = function (idea) {
    $http.delete(config.api + '/ideas/' + idea._id)
      .success(function () {
        $location.path('app/ideas/');
        alert('idea deleted!');
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.find = function () {
    $http.get(config.api + '/ideas')
      .success(function (data) {
        $scope.ideas = data;
        shuffle(data);
        $scope.ideas = data;
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.findOne = function () {
    $http.get(config.api + '/ideas/' + $stateParams.ideaId)
      .success(function (data) {
        $scope.idea = data;
      })
      .error(function () {
        console.log('data error');
      })
  };

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
});
