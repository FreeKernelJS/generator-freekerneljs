'use strict';

describe('[module fkjs.views.home]', function () {

    // load the controller's module and all its dependencies
    beforeEach(module('fkjs.views.home')); //main module
    
    var HomeCtrl, scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        scope = {};
        HomeCtrl = $controller('HomeViewController', {$scope: scope});
    }));
    
    // run tests
    describe('HomeViewController ::', function () {
        it('home view should have a controller', inject(function () {
            expect(HomeCtrl).toBeDefined();
        }));
        
        it('should attach a certain "param" to the scope which contains a certain value', function () {
            expect(scope.lastVisitDate).toBeDefined();
        });
    });
});
