angular.module('starter.projects', ['ionic'])

.controller('ProjectsController', function($scope, $http, $stateParams) {
  // Find a list of Projects
  $scope.find = function () {
    $http.get('https://still-eyrie-27550.herokuapp.com/api/projects')
    .success(function(data) {
      $scope.projects = data;
      shuffle(data);
      $scope.projects = data;
    })
    .error(function(){
      console.log('data error');
    })
  };
  $scope.findOne = function () {
    $http.get('https://still-eyrie-27550.herokuapp.com/api/projects/' + $stateParams.projectId)
    .success(function(data) {
      $scope.project = data;
    })
    .error(function(){
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
