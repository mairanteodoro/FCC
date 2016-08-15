'use strict';

/**
 * @ngdoc function
 * @name wikiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wikiApp
 */
angular.module('wikiApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.API_ROOT = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    $scope.API_OPTIONS = '&callback=JSON_CALLBACK';

    $scope.callRestService = function() {
      $http.jsonp($scope.API_ROOT + $scope.searchTerm + $scope.API_OPTIONS)
        .success(function(data) {
            $scope.results = data;
            $scope.hits = Object.keys($scope.results).length;
            console.log($scope.hits);
            console.log($scope.results);
        });
    };
  });
