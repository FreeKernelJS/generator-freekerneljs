'use strict';

/**
 * @ngdoc module
 * @name fkjs.views.home
 *
 * @description
 * A view for the home page of this application.
 */
angular.module('fkjs.views.home', [])

.controller('HomeViewController', function($scope){
    $scope.pageTitle = 'Home';
});