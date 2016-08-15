'use strict';

/**
 * @ngdoc directive
 * @name wikiApp.directive:myDirective
 * @description
 * # myDirective
 */
angular.module('wikiApp')
  .directive('myDirective', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the myDirective directive');
      }
    };
  });
