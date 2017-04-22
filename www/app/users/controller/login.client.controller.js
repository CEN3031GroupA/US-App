angular.module('user.controllers', [])

.controller('UserCtrl', function($scope, $http, $location, $state, $window) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // If user is signed in then redirect back home
  if ($scope.user) {
    $location.path('app/home');
  }

  $scope.init = function () {
    $scope.user = JSON.parse($window.localStorage.getItem("currentUser"));
  };

  $scope.signin = function () {
    var credentials = {
      email: this.email,
      password: this.password
    };

    $scope.error = null;

    $http.post(config.api + '/auth/signin', credentials)
      .success(function (response) {
      // If successful we assign the response to the global user model
      $window.localStorage.setItem("currentUser", angular.toJson(response));

        // And redirect to the previous or home page
      $state.go('app.home');
    }).error(function (response) {
      $scope.error = response.message;
    });
  };

  $scope.logout = function () {
    $http.post('https://still-eyrie-27550.herokuapp.com/logout').success(function () {
      localStorage.removeItem("currentUser");

      $state.go('app.login');
    }).error(function (response) {
      $scope.error = response.message;
    });
  };
});
