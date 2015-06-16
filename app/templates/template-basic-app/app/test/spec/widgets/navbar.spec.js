'use strict';

describe('[fkjs.widgets.navbar]', function () {

    // load the directive's module and all its dependencies
    beforeEach(module('fkjs.widgets.navbar')); // directive
    beforeEach(module('src/widgets/navbar/template.html')); // The directive's external template file
    beforeEach(module('ui.router.state')); //other dependency
    
    var element, $compile, $rootScope;

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, $state) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));
    
    // run tests
    describe('directive ::', function () {
        it('should define some param', inject(function () {
            // Create an instance of the directive and compile it
            element = angular.element('<fkjs-navbar></fkjs-navbar>');
            $compile(element)($rootScope); // Compile the directive
            $rootScope.$digest(); // Update the HTML
            
            // Get the isolate scope for the directive
            var isoScope = element.isolateScope();
            
            // Check that the scope (or some param attached to it e.g. isoScope.someParam) was defined
            expect(isoScope).toBeDefined();
        }));
    });
});

