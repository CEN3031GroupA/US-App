angular.module('starter.projects', ['ionic', 'ngCordova', 'starter.config', 'user.controllers', 'ja.qr'])

.config(function ($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',                    // trust all resources from the same origin
    '*://www.youtube.com/**'   // trust all resources from `www.youtube.com`
  ]);
})

.controller('QRCtrl', function($scope, $cordovaBarcodeScanner) {
  $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };
})

.controller('ProjectsController', function($scope, $http, $stateParams, $location, $rootScope, $window) {
  var currentUser = JSON.parse($window.localStorage.getItem("currentUser"));

  if (!$rootScope.activeProject) {
    $rootScope.activeProject = {
      description: {}
    };
  }

  // TODO: We'll need to populate this dynamically later
  $scope.categories = [
    {
      id: 0,
      title: 'Category 1',
      description: 'Hey there, this is the category description...'
    },
    {
      id: 1,
      title: 'Category 2',
      description: 'Hi there, this is the category description...'
    },
    {
      id: 2,
      title: 'Category 3',
      description: 'Hello there, this is the category description...'
    }
  ];

  $scope.activeCategory = $scope.categories[0];

  $scope.saveProjectInfo = function () {
    $rootScope.activeProject.title = this.title;
    $rootScope.activeProject.description.short = this.short;
    $rootScope.activeProject.description.long = this.long;

    $location.path('app/category');
  };

  $scope.setActiveCategory = function (category) {
    $scope.activeCategory = category;
  };

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

  // FIXME Update existing Project
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

      /* Initialize voting button */
      for(var i in currentUser.votedProjects) {
        if (currentUser.votedProjects[i] === $stateParams.projectId) {
          $scope.hasVoted = true;
        }
      }
    })
    .error(function(){
      console.log('data error');
    })
  };

  $scope.hasVoted = false;

  $scope.unvote = function (project) {
    for (var i in currentUser.votedProjects) {
      if (currentUser.votedProjects[i] === project._id) {
        currentUser.votedProjects.splice(i, 1);
        project.votes -= 1;
        $scope.hasVoted = false;
      }
    }
    $http.put(config.api + '/projects/' + project._id, project, { votes: project.votes });
    $http.put(config.api + '/user/' + currentUser._id, currentUser, { votedProjects : currentUser.votedProjects });
  };

  $scope.vote = function (project) {
    currentUser.votedProjects.push(project._id);
    project.votes += 1;
    $scope.hasVoted = true;

    $http.put(config.api + '/projects/' + project._id, project, { votes: project.votes });
    $http.put(config.api + '/user/' + currentUser._id, currentUser, { votedProjects : currentUser.votedProjects });
  };



  // Fake data for now
  $scope.teamusers = [
    {
      name: 'Jim'
    },
    {
      name: 'Jimbo'
    },
    {
      name: 'Dabo'
    }
  ];

  $scope.embed = function (url) {
    $scope.videoID = getYouTubeID(url);
    return ('http://www.youtube.com/embed/' + $scope.videoID);
  };

  function getYouTubeID (url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  }

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
