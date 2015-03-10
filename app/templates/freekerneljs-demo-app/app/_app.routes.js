angular.module('FreeKernelJsDemoApp')

.config(['$routeProvider',
    function($routeProvider){
        var homePage = '/home';
                
        $routeProvider
        
        .when('/', {redirectTo: homePage})
        .when(homePage, {
            templateUrl: 'views/home/page.html',
            module: 'HomeView',
            controller: 'HomeViewController'
        })
        
        .when('/signup', {
            templateUrl: 'views/signup/page.html',
            module: 'SignupView',
            controller: 'SignupViewController'
        })
        
        .when('/about', {
            templateUrl: 'views/about/page.html',
            module: 'AboutView',
            controller: 'AboutViewController'
        })
          
        .otherwise({ redirectTo: homePage });
    }
]);