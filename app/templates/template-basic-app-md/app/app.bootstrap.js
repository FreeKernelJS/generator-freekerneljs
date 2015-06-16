
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
 * It will also require {@link app.src.app-module-js app.module.js} and {@link app.src.app-routes-js app.routes.js} by this order.
 */
$script([
    // list all your files here:
    
    //services
    'src/services/http.js',
    
    //widgets
    'src/widgets/header/module.js',
    'src/widgets/navbar/module.js',
    
    //views
    'src/views/main/controller.js',
    'src/views/home/controller.js',
    'src/views/page2/controller.js',

    // app main file
    'src/app.module.js'

], 'appDependencies');


// load routes, then bootstrap the application.
$script.ready('appDependencies', function () {
    $script([
        'src/app.routes.js'

    ], function () {
        angular.bootstrap(document, ['<%= props.name %>']);
    });
});