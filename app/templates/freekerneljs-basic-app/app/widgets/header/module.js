'use strict';

/**
 * @ngdoc module
 * @name fkjs.widgets.header
 *
 * @description
 * Page Header Widget.
 */
angular.module('fkjs.widgets.header', [])


/**
 * @ngdoc directive
 * @name fkjsHeader
 * @module fkjs.widgets.header
 *
 * @description
 * This page header is displaying the name of the page at the top of the screen.
 * 
 * @example usage
 * <fkjs-header></fkjs-header>
 */
.directive('fkjsHeader', function(){
    return {
        restrict: 'E',
        templateUrl: 'widgets/header/template.html',
        replace: true,
        
        scope: {
        },
        
        link: function(scope, element, attrs){
            scope.$on('navbarStateChange', function(event, stateText){
                scope.pageTitle = stateText;
            });
        }
    };
});