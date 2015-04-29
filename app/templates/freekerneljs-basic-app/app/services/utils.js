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
 * @name stringFormat
 * @module fkjs.services.utils
 * 
 * @description
 * Format a string with parameters.
 * 
 * @example usage
 * var formattedStr = stringFormat.compile('Your name is: {0} {1}', 'Someone', 'Else');
 */
.service('stringFormat', function(){
    this.compile = function(args){
        var str = args[0];
        var i, reg, len=args.length;
        for(i=1 ; i<len ; i++){
            reg = new RegExp('\\{'+ i +'\\}', 'gm');
            str = str.replace(reg, args[i]);
        }
        return str;
    };
});