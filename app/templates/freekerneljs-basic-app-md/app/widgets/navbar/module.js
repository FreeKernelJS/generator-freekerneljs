'use strict';

/**
 * @ngdoc module
 * @name fkjs.widgets.navbar
 *
 * @description
 * Navigation bar for the application, displays on the left.
 */
angular.module('fkjs.widgets.navbar', [])


/*
 * @ngdoc directive
 * @name fkjsNavbar
 * @module fkjs.widgets.navbar
 *
 * @description
 * Set a list of pages in bar, manage click on each of the items in list.
 * 
 * @example usage
 * <fkjs-navbar></fkjs-navbar>
 */
.directive('fkjsNavbar', function($state, $rootScope){
    return {
        restrict: 'E',
        templateUrl: 'widgets/navbar/template.html',
        replace: true,

        scope: {
        },

        controller: function($scope){
/*
             * set "active" css on selected menu item,
             * fire event to notify header regarding this change.
 */
            $scope.$on('$stateChangeSuccess', function(event, current){
                var stateName = $state.$current.self.name;
                var items = $scope.navbarItems;
                var i, stateText, len=items.length;
                for(i=0 ; i<len ; i++){
                    if(items[i].pageUrl === stateName){
                        stateText = items[i].text;
                        $scope.navbarItems[i].isActive = true;
                    }
                    else{
                        $scope.navbarItems[i].isActive = false;
                    }
                }

                $rootScope.$broadcast('navbarStateChange', stateText);
            });
        },
        
        link: function(scope){
            scope.navbarItems = [{
                pageUrl: 'home',
                text: 'Home',
                isActive: true
            },{
                pageUrl: 'page2',
                text: 'Page 2'
            }];
        }
    };
});