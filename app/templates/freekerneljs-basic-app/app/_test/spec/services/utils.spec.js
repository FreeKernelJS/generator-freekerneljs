'use strict';

describe('[module fkjs.services.utils]', function () {

    // load the service's module and all its dependencies
    beforeEach(module('fkjs.services.utils'));
    
    var stringUtil;

    // Initialize the service
    beforeEach(inject(function (_stringUtil_) {
        stringUtil = _stringUtil_;
    }));
    
    // run tests
    describe('stringUtil service ::', function () {
        it('should format a string with params', inject(function () {
            expect(stringUtil.format('Run this {0}', 'test').length).toBe(13);
        }));
    });
});
