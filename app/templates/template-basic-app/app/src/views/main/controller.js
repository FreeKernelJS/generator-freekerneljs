'use strict';

/**
 * @ngdoc controller
 * @name fkjs.views.main
 *
 * @description
 * This controller is responsible for managing global aspects of the application.
 */
angular.module('fkjs.views.main', [])


/**
 * @ngdoc function
 * @name config
 * @methodOf fkjs.views.main
 * 
 * @description 
 * Initialize the localization object which is being provided by {@link http://angular-translate.github.io/docs/#/guide/ angular-translate package}.
 * You can also use {@link https://docs.angularjs.org/guide/i18n#messageformat-extensions message format}.
 */
.config(function($translateProvider){
    // Register a loader for the static files
    $translateProvider.useStaticFilesLoader({
        prefix: 'data/locale/',
        suffix: '.json'
    });
    
    //escape html chars inside messages
    $translateProvider.useSanitizeValueStrategy('escaped');
})


.controller('MainController', function($scope, $locale, $translate){
    // Tell the module what language to use by default (=file name)
    $translate.preferredLanguage($locale.id);
    $translate.use($locale.id);
});