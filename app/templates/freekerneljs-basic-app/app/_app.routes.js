angular.module('<%= props.name %>')

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
          
        .otherwise({ redirectTo: homePage });
    }
]);