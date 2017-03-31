angular.module('starter.projects', ['ionic'])

.controller('ProjectsController', function($scope, $http) {
  $scope.projects = "";
  $http.get('https://still-eyrie-27550.herokuapp.com/api/projects')
  .success(function(data) {
    console.log('data success');
    console.log(data); // for browser console
    $scope.projects = data; // for UI
  })
  .error(function(){
    console.log('data error');
  })
});
