angular.module('starter.faqs', ['ionic'])

.controller('FaqCtrl', function ($scope, $http, $stateParams, $location, $window) {
  var user = JSON.parse($window.localStorage.getItem("currentUser"));

  // Get all FAQs
  $scope.find = function () {
    $http.get(config.api + '/faqs')
      .success(function (data) {
        $scope.faqs = data;
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.findOne = function () {
    $http.get(config.api + '/faqs/' + $stateParams.faqId)
      .success(function (data) {
        $scope.faq = data;
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.addAnswer = function(){
    var answer = this.answer;

    if (answer.trim() === ''){
      return;
    }

    var req = {
      method: 'POST',
      url: config.api + '/faqs/' + $scope.faq._id + '/addAnswer',
      data: {
        answer: answer,
        solution: false
      }
    };

    this.answer = '';
    $http(req).then(function(response){
      $scope.faq = response.data;
    }, function(err){
      console.error(err);
    });
  };

  $scope.post = function () {
    $scope.error = null;

    var faq = {
      question: this.question,
      date: Date,
      user: this.user
    };

    $http.post(config.api + '/faqs', faq)
      .success(function () {
        $location.path('app/faqs');
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.remove = function (faq) {
    $http.delete(config.api + '/faqs/' + faq._id)
      .success(function () {
        $location.path('app/faqs');
      })
      .error(function () {
        console.log('data error');
      })
  };

  $scope.markBestSolution = function (answer) {
    for(var i in $scope.faq.answers) {
      if($scope.faq.answers[i].isSolution === true) {
        $scope.faq.answers[i].isSolution = false;
      }
    }

    var index = $scope.faq.answers.indexOf(answer);
    $scope.faq.answers[index].isSolution = true;

    var req = {
      method: 'PUT',
      url: config.api + '/faqs/' + $scope.faq._id,
      data: {
        answers: $scope.faq.answers
      }
    };

    $http(req).then(function(response){
      $scope.faq = response.data;
    }, function(err){
      console.error(err);
    });
  };
});

