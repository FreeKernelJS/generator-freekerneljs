/**
 * Load all JS dependencies, then bootstrap the application.
 */
$script([
    // list all your files here.
    
    //widgets
    'widgets/header/module.js',
    'widgets/navbar/module.js',
    
    //views
    'views/home/controller.js',

    // app files
    'app.module.js'

], 'appDependencies');


// finally load routes
$script.ready('appDependencies', function () {
    $script([
        'app.routes.js'

    ], function () {
        angular.bootstrap(document, ['<%= props.name %>']);
    });
});