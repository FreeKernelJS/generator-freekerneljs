/**
 * Load all JS dependencies, then bootstrap the application.
 */
$script([
    //widgets
    'widgets/navbar/module.js',
    'widgets/header/module.js',
    'widgets/notification/module.js',
    'widgets/tile/module.js',
    //views
    'views/main/controller.js',
    'views/home/controller.js',
    'views/signup/controller.js',
    'views/about/controller.js',
    //app files
    'app.module.js'

], 'appDependencies');


// finally load routes
$script.ready('appDependencies', function(){
    $script([
        'app.routes.js'

    ], function(){
        angular.bootstrap(document, ['FreeKernelJsDemoApp']);
    });
});