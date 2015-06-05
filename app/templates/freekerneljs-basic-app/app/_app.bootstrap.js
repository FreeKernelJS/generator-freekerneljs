
/**
 * @ngdoc overview
 * @name app
 * 
 * @description
 * ## About this app 
 * A simple AngularJS application.
 * 
 * You can start with {@link app.app-bootstrap-js app.bootstrap.js} which is the initial
 * file required by `index.html`.
 * 
 * > Please note that the initial file has been splitted into three different files 
 * for easy maintenance, and they all must refer to the same main module name.
 * 
 * @example
 * How to link between the three files using the same name:
 * <pre>
 * // app.bootstrap.js
 * angular.bootstrap(document, ['freekerneljs-app']);
 * 
 * // app.module.js and app.routes.js
 * angular.module('freekerneljs-app', [
 * </pre>
 */


/**
 * @ngdoc interface
 * @name app.app-bootstrap-js
 *
 * @description
 * `app.bootstrap.js` file, required by `index.html`, is responsible for loading 
 * all app's JS dependencies first, before the application is being initialized.
 * 
 * It will also require {@link app.app-module-js app.module.js} and {@link app.app-routes-js app.routes.js} by this order.
 */
$script([
    // list all your files here:
    
    //services
    'services/http.js',
    
    //widgets
    'widgets/header/module.js',
    'widgets/navbar/module.js',
    
    //views
    'views/main/controller.js',
    'views/home/controller.js',
    'views/page2/controller.js',

    // app main file
    'app.module.js'

], 'appDependencies');


// load routes, then bootstrap the application.
$script.ready('appDependencies', function () {
    $script([
        'app.routes.js'

    ], function () {
        angular.bootstrap(document, ['<%= props.name %>']);
    });
});