'use strict';

/**
 * @ngdoc module
 * @name fkjs.widgets.navbar
 *
 * @description
 * Navigation bar for the application, displays on the left.
 * When the navigation bar is open it pushes the entire content to the right, and user can work - 
 * in contradiction to the angular material sidenav original behavior which displayed the sidenav as 
 * a floating layer on top of the content and blocked it.
 * This can be changed in _navbar.scss
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
        text: 'Home',
        icon: 'mdi-home'
    },{
        pageUrl: 'signup',
        text: 'Sign Up',
        icon: 'mdi-mode-edit'
    },{
        pageUrl: 'about',
        text: 'About',
        icon: 'mdi-info-outline'
    }];
    
    //set "active" css on selected menu item
    $scope.isActive = function(viewLocation){ 
        var path = $location.path();
        path = path.substr(1, path.length);
        return viewLocation.toString() === path;
    };
});