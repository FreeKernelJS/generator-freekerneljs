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
        templateUrl: 'src/widgets/header/template.html',
        replace: true,
        
        scope: {
        },
        
        controller: function($scope){
            $scope.$on('navbarStateChange', function(event, stateText){
                $scope.pageTitle = stateText;
            });
        }
    };
});