/**
 * @ngdoc object
 * @name app.src.app-routes-js
 * 
 * @requires $stateProvider
 * @requires $urlRouterProvider
 *
 * @description
 * `app.routes.js` file is using {@link https://github.com/angular-ui/ui-router ui-router} 
 * package to declare all routes for the pages of this application.
 * Each page is declared in a different state.
 * 
 * @example
 * 
 * <pre>
 * .config(function($stateProvider, $urlRouterProvider){
 *      // Redirects and Otherwise
        $urlRouterProvider
            .otherwise( '/home' );
    
        // State Configurations
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'src/views/home/page.html',
                controller: 'HomeViewController'
            })
            
            .state('page2', {
                url: '/page2',
                templateUrl: 'src/views/page2/page.html'
            });
})
 * </pre>
 */
angular.module('fkjs_(name)')

.config(function($stateProvider, $urlRouterProvider){
             
        // ~~~ Redirects and Otherwise
        $urlRouterProvider
            .otherwise( '/home' );

    
        // ~~~ State Configurations
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'src/views/home/page.html',
                controller: 'HomeViewController'
            })
            
            .state('page2', {
                url: '/page2',
                templateUrl: 'src/views/page2/page.html',
                controller: 'Page2ViewController'
            });
});