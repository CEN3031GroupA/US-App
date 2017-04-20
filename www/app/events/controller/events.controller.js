angular.module('starter.events', ['ionic'])

.service('ActiveEvent', function ($http) {
  this.get = function () {
    return $http.get(config.api + '/events/latest').then(function (response) {
      return response.data;
    });
  }
})

.controller('EventsController', function($scope, $state, $stateParams, $location, $http) {

  $http.get(config.api + '/admin/eventCategories')
    .success(function(data) {
      $scope.eventCategories = data;
      $scope.eventCategoriesMap = {};

      for (var i = 0; i < $scope.eventCategories.length; i++) {
        $scope.eventCategoriesMap[i] = $scope.eventCategories[i];
      }

      $scope.resetSelectedCategories();
    })
    .error(function(){
      console.log('data error');
    });

  $scope.resetSelectedCategories = function() {
    $scope.selectedCategories = {};

    for (var i = 0; i < $scope.eventCategories.length; i++) {
      $scope.selectedCategories[i] = false;
    }
  };

  $scope.create = function() {
    var categories = [];

    for (var key in $scope.selectedCategories) {
      if (!$scope.selectedCategories.hasOwnProperty(key)) continue;
      if ($scope.selectedCategories[key] === false) continue;

      categories.push($scope.eventCategoriesMap[key]._id);
    }
    var event = {
      title: this.title,
      description: this.description,
      locations: this.locations,
      categories: categories,
      start: this.start,
      end: this.end
    };

    $http.post(config.api + '/admin/events', event)
      .success(function () {
        $location.path('app/admin/events');

        // Clear form fields
        $scope.title = '';
        $scope.description = '';
        $scope.locations = '';
        $scope.categories = [];
        $scope.resetSelectedCategories();
      })
      .error(function () {
        $scope.error = 'create project error';
      })
  };

  $scope.update = function () {
    var event = $scope.event;

    var categories = [];

    for (var key in $scope.selectedCategories) {
      if (!$scope.selectedCategories.hasOwnProperty(key)) continue;
      if ($scope.selectedCategories[key] === false) continue;

      categories.push($scope.eventCategoriesMap[key]._id);
    }
    event.categories = categories;
    $scope.resetSelectedCategories();

    $http.put(config.api + '/admin/events/' + event._id)
      .success(function() {
        $location.path('app/admin/events' + event._id);
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.find = function() {
    $http.get(config.api + '/admin/events')
      .success(function (data) {
        $scope.events = data;
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.findOne = function () {
    $http.get(config.api + '/admin/events/' + $stateParams.eventId)
      .success(function (data) {
        $scope.event = data;

        for (var i = 0; i < $scope.eventCategories.length; i++) {
          $scope.selectedCategories[i] = false;
          for (var j = 0; j < $scope.event.categories.length; j++) {
            if ($scope.eventCategories[i]._id === $scope.event.categories[j]._id) {
              $scope.selectedCategories[i] = true;
            }
          }
        }
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.remove = function (event) {
    $http.delete(config.api + '/admin/events/' + event._id)
      .success(function () {
        $location.path('app/admin/events');
      })
      .error(function () {
        console.log('data error');
      })
  };
});
