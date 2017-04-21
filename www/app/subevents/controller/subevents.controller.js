angular.module('starter.subevents', ['ionic', 'starter.events'])

.controller('SubEventsController', function ($http, $scope, $state, $stateParams, $location, $interval, ActiveEvent) {
  $scope.init = function() {
    ActiveEvent.get().then(function(activeEvent) {
      $scope.activeEvent = activeEvent;
      $scope.calcEventTime();
      $interval($scope.calcEventTime, 1000);
    });
  };

  $scope.loadEvent = function(cb) {
    if ($stateParams.eventId) {
      $http.get(config.api + '/admin/events/' + $stateParams.eventId)
        .success(function (data) {
          $scope.event = data;

        if (cb) {
          cb(data);
        }
      });
    } else {
      $scope.event = ActiveEvent.get().then(function(event) {
        $scope.event = event;

        if (cb) {
          cb(event);
        }
      });
    }
  };

  $scope.loadEvent();

  $scope.create = function() {
    var subevent = {
      title: this.title,
      description: this.description,
      location: this.location,
      datetime: this.datetime,
      event: $scope.event
    };

    $http.post(config.api + '/admin/events/' + $scope.event._id + '/subevents', subevent)
      .success(function () {
        $location.path('app/admin/events');

        // Clear form fields
        $scope.title = '';
        $scope.description = '';
        $scope.location = '';
      })
      .error(function () {
        $scope.error = 'create project error';
      })
  };


  $scope.find = function () {
    var querySubevents = function (event) {
      $scope.activeEvent = event;

      $http.get(config.api + '/admin/events/' + event._id + '/subevents')
       .success(function(data) {
         $scope.subevents = data;
       });

      $scope.calcEventTime();
      $interval($scope.calcEventTime, 1000);
    };

    $scope.loadEvent(querySubevents);
  };

  $scope.findOne = function () {
    var querySubevent = function (event) {
      $http.get(config.api + '/admin/events/' + event._id + '/subevents/' + $stateParams.subeventId)
        .success(function(data) {
          $scope.subevent = data;
        })
        .error(function() {
          console.log("data error");
        })
    };

    $scope.loadEvent(querySubevent);
  };

  $scope.update = function (subevent) {
    $http.put(config.api + '/admin/events/' + $scope.event._id + '/subevents/' + subevent._id)
      .success(function() {
        $location.path('app/admin/events/' + $scope.event._id + '/subevents');
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.remove = function (subevent) {
    $http.delete(config.api + '/admin/events/' + $scope.event._id + '/subevents/' + subevent._id)
    .success(function() {
        $location.path('app/admin/events/' + $scope.event._id + '/subevents');
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.calcEventTime = function() {
    var now = new Date();
    var timeLeft, timeTill;
    var days, hours, minutes, seconds;
    var startDate = new Date($scope.activeEvent.start);
    var endDate = new Date($scope.activeEvent.end);

    if (startDate < now) {
      $scope.activeEvent.inProgress = true;
      timeLeft = parseInt((endDate - now) / 1000); // Time left in seconds
      hours = parseInt(timeLeft / (60*60));
      minutes = parseInt((timeLeft - hours * 60 * 60) / 60);
      seconds = timeLeft - hours * 60 * 60 - minutes * 60;
      $scope.activeEvent.timer = hours + ':' + minutes + ':' + seconds;
    } else {
      $scope.activeEvent.inProgress = false;
      timeTill = parseInt((startDate - now) / 1000); // Time till in seconds
      days = parseInt(timeTill / (24 * 60 * 60));
      hours = parseInt((timeTill - days * 24 * 60 * 60) / 60 / 60);
      minutes = parseInt((timeTill - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
      $scope.activeEvent.timer = days + ' days, ' + hours + ' hours, ' + minutes + ' minutes';
    }
  };

});
