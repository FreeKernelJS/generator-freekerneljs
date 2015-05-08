angular.module('<%= props.name %>')

.config(function($stateProvider, $urlRouterProvider){
             
        // ~~~ Redirects and Otherwise
        $urlRouterProvider
            .otherwise( '/home' );

    
        // ~~~ State Configurations
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/page.html',
                controller: 'HomeViewController'
            })
            
            .state('page2', {
                url: '/page2',
                templateUrl: 'views/page2/page.html'
            });
});