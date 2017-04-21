angular.module('starter.projects', ['ionic','ngCordova','starter.config', 'user.controllers', 'starter.events', 'starter.ideas', 'ja.qr'])

// Allow access to youtube
.config(function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',                    // trust all resources from the same origin
    '*://www.youtube.com/**'   // trust all resources from `www.youtube.com`
  ]);
})

.controller('ProjectsController', function(sharedInputFields, $scope, $http, $stateParams, $location, $rootScope, $window, $cordovaBarcodeScanner, ActiveEvent, $ionicPopover) {
  // Grab signed in user object
  var user = JSON.parse($window.localStorage.getItem("currentUser"));

  if (!$rootScope.activeProject) {
    $rootScope.activeProject = {
      description: {},
      owner: user,
      team: []
    };
  }

  ActiveEvent.get().then(function(activeEvent) {
    $scope.activeEvent = activeEvent;
    $scope.activeCategory = $scope.activeEvent.categories[0];
  });

  $scope.team = $rootScope.activeProject.team;

  // Create Project: Add Descriptions
  $scope.saveProjectInfo = function () {
    $rootScope.activeProject.title = this.title;
    $rootScope.activeProject.youtube = this.youtube;
    $rootScope.activeProject.description.short = this.short;
    $rootScope.activeProject.description.long = this.long;

    $location.path('app/projects/category');
  };

// Create Project: Set Category
  $scope.setActiveCategory = function (category) {
    $scope.activeCategory = category;
  };

  // Create Project: Save Category
  $scope.saveProjectCategory = function () {
    $rootScope.activeProject.category = $scope.activeCategory.title;
    var inputFields = sharedInputFields.set();
    if (inputFields.length !== 0)
    {
      $rootScope.activeProject.title = inputFields[0];
      $rootScope.activeProject.youtube = '';
      $rootScope.activeProject.short = inputFields[1];
      $rootScope.activeProject.long = inputFields[2];
      $rootScope.activeProject.owner = $scope.user;
      inputFields = [];
      sharedInputFields.clear();

      $location.path('app/projects/team');
    }
    $location.path('app/projects/team');
  };

  // Create new project
  $scope.create = function () {
    $scope.error = null;

    $rootScope.activeProject.event = $scope.activeEvent;

    var project = $rootScope.activeProject;

    $http.post(config.api + '/projects', project)
      .success(function(data) {
        $location.path('app/projects/' + data._id);
        $rootScope.activeProject = null;
      })
      .error(function () {
        $scope.error = 'create project error';
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
    $http.put(config.api + '/projects/' + project._id, project)
      .success(function(data) {
        $scope.project = data;
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
  $scope.QRProjectId = null; //Used for QR string
  $scope.findOne = function () {
    $http.get(config.api + '/projects/' + $stateParams.projectId)
    .success(function(data) {
      $scope.project = data;
      $scope.QRProjectId = $scope.project._id;

      $http.get(config.api + '/user/' + user._id)
        .success(function(user) {
          $scope.hasVoted = user.votedProjects.indexOf(data._id) !== -1;
        })
        .error(function() {
          console.log('could not retrieve user');
        });
    })
    .error(function(){
      console.log('data error');
    })
  };

  //Boolean sets voting button in single project view
  $scope.hasVoted = false;

  // Vote for a project
  $scope.vote = function (project) {
    $http.put(config.api + '/projects/' + project._id + '/vote')
      .success(function() {
        $scope.hasVoted = true;
      })
      .error(function () {
        console.log('data error');
      });
  };

  // Unvote for a project
  $scope.unvote = function (project) {
    $http.delete(config.api + '/projects/' + project._id + '/vote')
      .success(function() {
        $scope.hasVoted = false;
      })
      .error(function () {
        console.log('data error');
      });
  };

  // Scan to vote function, opens QR scanner
  $scope.scanBarcode = function () {
    $cordovaBarcodeScanner.scan().then(function (data) {
      $scope.hasVoted = user.votedProjects.indexOf(data.text) !== -1;
      if(!$scope.hasVoted) {
        $http.put(config.api + '/projects/' + data.text + '/vote')
          .success(function() {
            $scope.hasVoted = true;
            alert("voted!");
          })
          .error(function () {
            console.log('data error');
            alert("vote error!");
          });
      } else {
        alert("already voted!");
      }
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

  // Add comment in single project view
  $scope.addComment = function() {
    var comment = this.comment;

    if (comment.trim() === ''){
      return;
    }

    var req = {
      method: 'POST',
      url: config.api + '/projects/' + $scope.project._id + '/addComment',
      data: {
        content: comment
      }
    };

    this.comment = '';

    $http(req).then(function(response){
      $scope.project = response.data;
    }, function(err){
      console.error(err);
    });
  };


  // shuffles projects to random order
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
