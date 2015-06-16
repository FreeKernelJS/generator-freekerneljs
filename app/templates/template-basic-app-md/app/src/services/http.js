'use strict';

/**
 * @ngdoc controller
 * @name fkjs.services.http
 *
 * @description
 * Client-server communication.
 */
angular.module('fkjs.services.http', [])


/**
 * @ngdoc service
 * @name httpService
 * @methodOf fkjs.services.http
 * 
 * @param {string} url The URL of the get request.
 *
 * @description
 * The http service provides communication with the remote HTTP servers 
 * via the browser's XMLHttpRequest object.
 * Interceptors can be added by listening to any of the broadcasting events:
 * - beforeAjaxRequest
 * - ajaxRequestSuccess
 * - ajaxRequestError
 * 
 * @example
 * <pre>
 * httpService.get('url.json').then(function(data){ 
 *     console.log(data); 
 * });
 * </pre>
 * 
 * @returns {object} Returns the JSON object from the response.
 */
.service('httpService', function($http, $rootScope, $q, $log){
    this.get = function(url){
        $rootScope.$broadcast('beforeAjaxRequest');

        var deferred = $q.defer();
        
        $http.get(url)

        .success(function(res){
            deferred.resolve(res);
            $rootScope.$broadcast('ajaxRequestSuccess');
        })
        
        .error(function(msg, code){
            deferred.reject(msg);
            $log.error(msg, code);
            $rootScope.$broadcast('ajaxRequestError');
        });

        return deferred.promise;
    };
});