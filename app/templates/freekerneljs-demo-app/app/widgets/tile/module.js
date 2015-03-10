'use strict';

/**
 * Tile Widget
 */
angular.module('fkjs.widgets.tile', [])

.directive('fkjsTile', function(){
    return {
        restrict: 'E',
        templateUrl: 'widgets/tile/template.html',
        replace: true
    };
})

.controller('InfoTileController', function($scope){
    $scope.getIconByType = function(type){
        var cls = type +' ';
        
        if(type === 'visitors'){
            return cls +'mdi-visibility';
        }
        else if(type === 'users'){
            return cls +'mdi-person';
        }
        else if(type === 'tickets'){
            return cls +'mdi-label';
        }
        else if(type === 'topics'){
            return cls +'mdi-description';
        }
    };
});