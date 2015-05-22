'use strict';

/*
 * @ngdoc module
 * @name fkjs.widgets.header
 */
angular.module('fkjs.widgets.header', [])

/**
 * @ngdoc directive
 * @name fkjs.widgets.fkjsHeader
 *
 * @description
 * Page Header Widget.
 * 
 * This header is displaying the name of the page on the top.
 * 
 * @usage
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