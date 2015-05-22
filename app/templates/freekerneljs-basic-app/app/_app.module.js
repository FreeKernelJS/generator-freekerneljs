/**
 * @ngdoc interface
 * @name app.app-module-js
 *
 * @description
 * `app.module.js` file is responsible for listing all the modules required by this application.
 * 
 * For an enterprise application the list can be very long and therefore it is arranged by categories.
 */
angular.module('<%= props.name %>', [
    // modules dependencies for 
    // the application:
    
    //angular modules
    'ui.router',
    
    //app services
    'fkjs.services.utils',
    
    //app widgets
    'fkjs.widgets.header',
    'fkjs.widgets.navbar',
    
    //app views
    'fkjs.views.home',
    'fkjs.views.page2'
]);