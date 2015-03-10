'use strict';

/**
 * @ngdoc module
 * @name fkjs.widgets.navbar
 *
 * @description
 * Navigation bar for the application, displays on the left.
 */
angular.module('fkjs.widgets.navbar', [])


/*
 * @ngdoc directive
 * @name fkjsNavbar
 * @module fkjs.widgets.navbar
 *
 */
.directive('fkjsNavbar', function(){
    return {
        restrict: 'E',
        templateUrl: 'widgets/navbar/template.html',
        replace: true
    };
})


/*
 * @ngdoc controller
 * @name NavbarController
 * @module fkjs.widgets.navbar
 *
 */
.controller('NavbarController', function($scope, $location){

    $scope.navbarItems = [{
        pageUrl: 'home',
        text: 'Home'
    }];
});