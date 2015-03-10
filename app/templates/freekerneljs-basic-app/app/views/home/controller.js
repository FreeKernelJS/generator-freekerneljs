'use strict';

/**
 * @ngdoc module
 * @name HomeView
 *
 * @description
 * A view for the application home page.
 */
angular.module('HomeView', [])

.controller('HomeViewController', function($scope){
    $scope.pageTitle = 'Home';
});