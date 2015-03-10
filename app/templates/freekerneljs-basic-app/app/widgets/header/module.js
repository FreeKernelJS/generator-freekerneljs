'use strict';

/**
 * @ngdoc module
 * @name fkjs.widgets.header
 *
 * @description
 * Page Header Widget.
 */
angular.module('fkjs.widgets.header', [])

.directive('fkjsHeader', function(){
    return {
        restrict: 'E',
        templateUrl: 'widgets/header/template.html',
        replace: true
    };
});