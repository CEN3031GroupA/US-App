angular.module('starter.ideas', ['ionic', 'starter.config', 'starter.events'])

.service('sharedInputFields', function() {
  return {
    formData: [],
    add: function(item) {
      this.formData.push(item);
    },
    set: function() {
      return this.formData;
    },
    clear: function() {
      this.formData = [];
    }
  };
})

.controller('IdeasController', function ($scope, $http, $stateParams, $location, $rootScope, $window, ActiveEvent) {
  var user = JSON.parse($window.localStorage.getItem("currentUser"));

  if (!$rootScope.activeIdea) {
    $rootScope.activeIdea = {
      description: {},
      owner: user,
      team: []
    };
  }

  ActiveEvent.get().then(function(activeEvent) {
    $scope.activeEvent = activeEvent;
    $scope.activeCategory = $scope.activeEvent.categories[0];
  });

  $scope.team = $rootScope.activeIdea.team;

  $scope.create = function () {
    $scope.error = null;

    $rootScope.activeIdea.event = $scope.activeEvent;
    // Create new Idea object
    $rootScope.activeIdea.title = this.title;
    $rootScope.activeIdea.youtube = this.youtube;
    $rootScope.activeIdea.description.short = this.short;
    $rootScope.activeIdea.description.long = this.long;

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

  $scope.ideaToProject = function() {
    sharedInputFields.add($scope.idea.title);
    sharedInputFields.add($scope.idea.short);
    sharedInputFields.add($scope.idea.long);
    $scope.remove($scope.idea);


    $location.path('app/projects/category');
  };

  // Delete an idea
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

  $scope.update = function (idea) {
    $http.put(config.api + '/ideas/' + idea._id)
      .success(function() {
        $location.path('app/ideas/' + idea._id);
      })
      .error(function () {
        console.log('data error');
      })
  };

  // Get all ideas
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

  // Get a specific idea
  $scope.findOne = function () {
    $http.get(config.api + '/ideas/' + $stateParams.ideaId)
      .success(function (data) {
        $scope.idea = data;
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.loadUsers = function() {
    $http.get(config.api + '/user')
      .success(function(data) {
        $scope.users = data;

        for (var i = 0; i < $scope.users.length; i++) {
          if ($scope.owner._id === $scope.users[i]._id) {
            $scope.users.splice(i, 1);
          }
        }
      })
      .error(function(){
        console.log('data error');
      })
  };

  $scope.addMember = function(user) {
    $rootScope.activeIdea.team.push(user);

    for (var i = 0; i < $scope.users.length; i++) {
      if (user._id === $scope.users[i]._id) {
        $scope.users.splice(i, 1);
      }
    }
  };

  $scope.removeMember = function(user) {
    $scope.users.push(user);

    for (var i = 0; i < $rootScope.activeIdea.team.length; i++) {
      if (user._id === $rootScope.activeIdea.team[i]._id) {
        $rootScope.activeIdea.team.splice(i, 1);
      }
    }
  };

  $scope.addComment = function() {
    var comment = this.comment;

    if (comment.trim() === ''){
      return;
    }

    var req = {
      method: 'POST',
      url: config.api + '/ideas/' + $scope.idea._id + '/addComment',
      data: {
        content: comment
      }
    };

    this.comment = '';

    $http(req).then(function (response) {
      $scope.idea = response.data;
    }, function (err) {
      console.error(err);
    });
  };

  // Shuffle ideas in random order
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
