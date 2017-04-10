angular.module('starter.projects', ['ionic','ngCordova','starter.config', 'user.controllers', 'ja.qr'])

.config(function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',                    // trust all resources from the same origin
    '*://www.youtube.com/**'   // trust all resources from `www.youtube.com`
  ]);
})

.controller('ProjectsController', function($scope, $http, $stateParams, $location, $rootScope, $window, $cordovaBarcodeScanner) {
  var currentUser = JSON.parse($window.localStorage.getItem("currentUser"));

  if (!$rootScope.activeProject) {
    $rootScope.activeProject = {
      description: {},
      owner: $scope.user,
      team: []
    };
  }

  $scope.team = $rootScope.activeProject.team;

  // Create Project: Add Descriptions
  $scope.saveProjectInfo = function () {
    $rootScope.activeProject.title = this.title;
    $rootScope.activeProject.youtube = this.youtube;
    $rootScope.activeProject.description.short = this.short;
    $rootScope.activeProject.description.long = this.long;

    $location.path('app/category');
  };

// Create Project: Set Category
  $scope.setActiveCategory = function (category) {
    $scope.activeCategory = category;
  };

  // Create Project: Save Category
  $scope.saveProjectCategory = function () {
    $rootScope.activeProject.category = $scope.activeCategory.title;

    $location.path('app/team');
  };

  // Create new project
  $scope.create = function () {
    var project = $rootScope.activeProject;

    $http.post(config.api + '/projects', project)
      .success(function(data) {
        $location.path('app/projects/' + data._id);
        $rootScope.activeProject = null;
      })
      .error(function () {
        console.log('data error');
      })
  };

  // Remove existing Project
  $scope.remove = function (project) {
    $http.delete(config.api + '/projects/' + project._id)
      .success(function() {
        $location.path('app/projects/');
        alert('project deleted!');
      })
      .error(function () {
        console.log('data error');
      })
  };

  // Update existing project
  $scope.update = function (project) {
    $http.put(config.api + '/projects' + project._id)
      .success(function() {
        $location.path('app/projects/' + project._id);
      })
      .error(function () {
        console.log('data error');
      })
  };

  // Find a list of Projects
  $scope.find = function () {
    $http.get(config.api + '/projects')
    .success(function(data) {
      $scope.projects = data;
      shuffle(data);
      $scope.projects = data;
    })
    .error(function(){
      console.log('data error');
    })
  };

  // Find one project
  $scope.findOne = function () {
    $http.get(config.api + '/projects/' + $stateParams.projectId)
    .success(function(data) {
      $scope.project = data;
      $scope.hasVoted = currentUser.votedProjects.indexOf(data._id) !== -1;
    })
    .error(function(){
      console.log('data error');
    })
  };

  $scope.stringify = function(projectId) {

  };

  /* Initialize voting field */
  $scope.hasVoted = false;

  // Vote for a project
  $scope.vote = function (project) {
    $http.put('/api/projects/' + project._id + '/vote')
      .success(function() {
        $scope.hasVoted = true;
      })
      .error(function () {
        console.log('data error');
      });
  };

  // Unvote for a project
  $scope.unvote = function (project) {
    $http.delete('/api/projects/' + project._id + '/vote')
      .success(function() {
        $scope.hasVoted = false;
      })
      .error(function () {
        console.log('data error');
      });
  };
  var vm = this;
  $scope.scanBarcode = function () {
    $cordovaBarcodeScanner.scan().then(function (data) {
      $http.get(config.api + '/projects/' + data.text)
        .success(function (data) {
          var project = data;
          $scope.hasVoted = currentUser.votedProjects.indexOf(project._id) !== -1;

          if ($scope.hasVoted) {
            alert("already voted!!");
          } else {
            vote(project);
            alert("voted!");
          }

          vm.scanResults = "We got a barcode" +
            "Project: " + project + "n" +
            "hasVoted: " + $scope.hasVoted + "n" +
            "Cancelled: " + result.cancelled;
        })
        .error(function () {
          alert('Could not retrieve project!');
        });
    }, function (error) {
      console.log("Scanning error: " + error);
    });
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
    $rootScope.activeProject.team.push(user);

    for (var i = 0; i < $scope.users.length; i++) {
      if (user._id === $scope.users[i]._id) {
        $scope.users.splice(i, 1);
      }
    }
  };

  $scope.removeMember = function(user) {
    $scope.users.push(user);

    for (var i = 0; i < $rootScope.activeProject.team.length; i++) {
      if (user._id === $rootScope.activeProject.team[i]._id) {
        $rootScope.activeProject.team.splice(i, 1);
      }
    }
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
});;
