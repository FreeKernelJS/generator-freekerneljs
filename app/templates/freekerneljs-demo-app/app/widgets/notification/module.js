'use strict';

/**
 * @ngdoc module
 * @name fkjs.widgets.notification
 *
 * @description
 * Notification Widget.
 * Opens a dialog which displays notifications.
 */
angular.module('fkjs.widgets.notification', [])

.directive('fkjsNotification', function(){
    return {
        restrict: 'E',
        templateUrl: 'widgets/notification/template.html',
        replace: true
    };
})

.controller('NotificationController', function($scope, $mdDialog){
    
    function DialogController($scope, $mdDialog){
        $scope.notificationItems = [{
            text: 'All',
            icon: 'mdi-message',
            total: 4
        },{
            text: 'Warnings',
            icon: 'mdi-warning',
            total: 2
        },{
            text: 'Errors',
            icon: 'mdi-error',
            total: 1
        },{
            text: 'Todo\'s',
            icon: 'mdi-assignment',
            total: 1
        }];

        $scope.hide = function(){
            $mdDialog.hide();
        };
    }

    $scope.showNotifications = function(ev){
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'widgets/notification/dialog.template.html',
            targetEvent: ev
        });
    };
});