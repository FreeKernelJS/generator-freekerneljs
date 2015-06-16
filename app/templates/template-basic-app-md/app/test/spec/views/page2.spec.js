'use strict';

describe('[module fkjs.views.page2]', function () {

    // load the controller's module and all its dependencies
    beforeEach(module('fkjs.views.page2'));
    beforeEach(module('fkjs.services.http')); //dependency
    
    var Page2Ctrl;
    
    // Initialize the controller and scope
    beforeEach(inject(function ($controller, httpService) {
        var $scope = {};
        Page2Ctrl = $controller('Page2ViewController', {$scope: $scope});
    }));
    
    // run tests
    describe('Page2ViewController ::', function () {
        it('page2 view should have a controller', inject(function () {
            expect(Page2Ctrl).toBeDefined();
        }));
    });
});
