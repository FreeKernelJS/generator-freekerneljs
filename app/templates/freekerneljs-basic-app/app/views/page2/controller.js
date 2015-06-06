'use strict';

/**
 * @ngdoc controller
 * @name fkjs.views.page2
 * 
 * @description
 * A view for another page in the application.
 * This page is using the {@link fkjs.services.http httpService} to get data using an Ajax request.
 */
angular.module('fkjs.views.page2', [])

.controller('Page2ViewController', function($scope, httpService){
    
    //load data with get request
    httpService.get('data/server/getList.php').then(function(data){ 
        $scope.list = data;
    });
});