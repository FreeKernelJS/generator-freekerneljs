'use strict';

/**
 * @ngdoc controller
 * @name fkjs.services.utils
 *
 * @description
 * Utilities services.
 * 
 * # stringUtil
 * Utilities for strings
 */
angular.module('fkjs.services.utils', [])


/*
 * @ngdoc service
 * @name stringUtil
 */
.service('stringUtil', function(){
    
    /**
     * @ngdoc function
     * @name stringUtil.format
     * @methodOf fkjs.services.utils
     *
     * @description
     * Format a string with any number of parameters.
     * 
     * @example
     * <pre>
     * controller('MyController', function($scope, stringUtil){
     *   $scope.someText = stringUtil.format('Your name is {0} {1}', 'Someone', 'Else');
     * });
     * </pre>
     * 
     * @returns {string} Returns the formatted string.
     */
    this.format = function(){
        var len = arguments.length;
        if(len === 0){
            return '';
        }
        
        var str = arguments[0];
        if(len === 1){
            return arguments[0];
        }
        
        var i, reg;
        for(i=1 ; i<len ; i++){
            reg = new RegExp('\\{'+ (i-1) +'\\}', 'gm');
            str = str.replace(reg, arguments[i]);
        }
        
        return str;
    };
});