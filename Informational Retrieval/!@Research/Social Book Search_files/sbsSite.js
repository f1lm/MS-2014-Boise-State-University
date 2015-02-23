angular.module('sbsSite', ['ngRoute']).
  config(function($routeProvider) {
    $routeProvider.
      when('/overview', {
        templateUrl:'partials/overview.html'
      }).
      when('/suggestion', {
        templateUrl:'partials/suggestion.html'
      }).
      when('/suggestion15', {
        templateUrl:'partials/suggestion15.html'
      }).
      when('/interactive', {
        templateUrl:'partials/interactive.html'
      }).
      when('/schedule', {
        templateUrl:'partials/schedule.html'
      }).
      when('/data', {
        templateUrl:'partials/data.html',
        controller:'dataCtrl'
      }).
      when('/organisers', {
        templateUrl:'partials/organisers.html'
      }).
      when('/contact', {
        templateUrl:'partials/contact.html'
      }).
      otherwise({
        redirectTo:'/overview',
        templateUrl:'partials/overview.html'
      })
  });

function MainCtrl($scope, $location) {
  $scope.setRoute = function(route) {
    $location.path(route);
  }
}

function dataCtrl($scope, $location, $http) {
  $http.get('json/topics_qrels.json').success(function(data) {
    $scope.editions = data;
  });
}
