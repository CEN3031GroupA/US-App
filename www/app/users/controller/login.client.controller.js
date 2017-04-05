angular.module('user.controllers', [])

.factory('Authentication', ['$window',
  function ($window) {
    var auth = {
      user: $window.user
    };
    return auth;
  }
])

.controller('UserCtrl', function($scope, $http, $location, $state, Authentication) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.authentication = Authentication;

  // If user is signed in then redirect back home
  if ($scope.authentication.user) {
    $location.path('/');
  }

  $scope.signin = function () {
    var credentials = {
      email: this.email,
      password: this.password
    };

    $scope.error = null;

    $http.post(config.api + '/auth/signin', credentials).success(function (response) {
      // If successful we assign the response to the global user model
      $scope.authentication.user = response;

      // And redirect to the previous or home page
      $state.go('app.home');
    }).error(function (response) {
      $scope.error = response.message;
    });
  };


});
