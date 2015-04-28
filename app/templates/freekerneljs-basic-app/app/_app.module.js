angular.module('<%= props.name %>', [
    // modules dependencies for 
    // the application:
    
    //angular modules
    'ngMaterial',
    'ngAnimate',
    'ui.router',
    
    //app services
    'fkjs.services.utils',
    
    //app widgets
    'fkjs.widgets.header',
    'fkjs.widgets.navbar',
    
    //app views
    'fkjs.views.home'
]);