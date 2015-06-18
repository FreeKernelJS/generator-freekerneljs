'use strict';


angular.module('fkjs.widgets.navbar', [])

/**
 * @ngdoc directive
 * @name fkjs.widgets.fkjsNavbar
 *
 * @description
 * Set a list of pages in a bar, manage click on each of the items in list.
 * 
 * @usage
 * <fkjs-navbar></fkjs-navbar>
 */
.directive('fkjsNavbar', function($state, $rootScope){
    return {
        restrict: 'E',
        templateUrl: 'src/widgets/navbar/template.html',
        replace: true,

        scope: {
        },

        controller: function($scope){
            /*
             * set "active" css on selected menu item,
             * fire event to notify header regarding this change, and update its text.
             * Please note that it is relying on the navbarItems array structure.
             */
            $scope.$on('$stateChangeSuccess', function(event, current){
                var stateName = $state.$current.self.name;
                var activeCss = $scope.activeCss;
                var items = $scope.navbarItems;
                var i, stateText, len=items.length;
                for(i=0 ; i<len ; i++){
                    if(items[i].pageUrl === stateName){
                        stateText = items[i].locale;
                        $scope.navbarItems[i].activeCss = activeCss;
                    }
                    else{
                        $scope.navbarItems[i].activeCss = '';
                    }
                }
                
                $rootScope.$broadcast('navbarStateChange', stateText);
            });
        },
        
        link: function(scope){
            var activeCss = 'active';
            scope.activeCss = activeCss;

            scope.navbarItems = [{
                pageUrl: 'home',
                locale: 'widgets.navbar.home',
                activeCss: activeCss
            },{
                pageUrl: 'page2',
                locale: 'widgets.navbar.page2'
            }];
        }
    };
});