/*
 * Load all JS dependencies first
 */
$script([
    // list all your files here.
    
    //services
    'services/utils.js',
    
    //widgets
    'widgets/header/module.js',
    'widgets/navbar/module.js',
    
    //views
    'views/home/controller.js',

    // app files
    'app.module.js'

], 'appDependencies');


/*
 * Finally load routes, then bootstrap the application.
 */
$script.ready('appDependencies', function () {
    $script([
        'app.routes.js'

    ], function () {
        angular.bootstrap(document, ['<%= props.name %>']);
    });
});