angular.module('starter.projects', ['ionic'])

.controller('ProjectsController', function($scope, $http, $stateParams, $location, $rootScope) {


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

    $http.post('https://still-eyrie-27550.herokuapp.com/api/projects', project)
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
    $http.delete('https://still-eyrie-27550.herokuapp.com/api/projects/' + project._id)
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
    $http.put('https://still-eyrie-27550.herokuapp.com/api/projects' + project._id)
      .success(function() {
        $location.path('app/projects/' + project._id);
      })
      .error(function () {
        console.log('data error');
      })
  };

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

  // Find one project
  $scope.findOne = function () {
    $http.get('https://still-eyrie-27550.herokuapp.com/api/projects/' + $stateParams.projectId)
    .success(function(data) {
      $scope.project = data;
    })
    .error(function(){
      console.log('data error');
    })
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
