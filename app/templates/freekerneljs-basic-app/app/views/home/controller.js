'use strict';

/**
 * @ngdoc controller
 * @name fkjs.views.home
 *
 * @description
 * A view for the home page of this application.
 */
angular.module('fkjs.views.home', [])

.controller('HomeViewController', function($scope, stringUtil){
    $scope.someText = stringUtil.format('content {0}', 'here');
});