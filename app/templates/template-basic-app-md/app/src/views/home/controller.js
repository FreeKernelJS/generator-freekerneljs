'use strict';

/**
 * @ngdoc controller
 * @name fkjs.views.home
 *
 * @description
 * A view for the home page of this application.
 */
angular.module('fkjs.views.home', [])

.controller('HomeViewController', function($scope){
    // define a message parameter
    $scope.lastVisitDate = (new Date()).toLocaleDateString();
});