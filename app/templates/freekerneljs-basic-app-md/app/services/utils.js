'use strict';

/**
 * @ngdoc module
 * @name fkjs.services.utils
 *
 * @description
 * Utilities services
 */

angular.module('fkjs.services.utils', [])


/*
 * @ngdoc service
 * @name stringUtil
 * @module fkjs.services.utils
 * 
 * @description
 * Format a string with parameters.
 * 
 * @example usage
 * var formattedStr = stringFormat.compile('Your name is {0} {1}', 'Someone', 'Else');
 * 
 * The result will be: "Your name is Someone Else"
 */
.service('stringUtil', function(){
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