'use strict';

/**
 * Sign Up page
 */
angular.module('SignupView', [])

.controller('SignupViewController', function($scope, $timeout, $q){
    $scope.pageTitle = 'Sign Up';
    
    $scope.survey = ['Social Network', 'Advertisement', 'Friend', 'Other'];
    
    // list of 'states' value/display objects
    var statesList = {
        selectedItem: null,
        searchText: null,
        states: null,
        
        // Search for states... use $timeout to simulate
        // remote dataservice call.
        querySearch: function(query){
            var deferred = $q.defer();
            var self = this;
            $timeout(function () {
                var results = query ? self.states.filter(self.createFilterFor(query)) : [];
                deferred.resolve(results);
            }, Math.random() * 1000, false);
            return deferred.promise;
        },
        
        // Build 'states' list of key/value pairs
        loadAll: function(){
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Deleware,\
                Florida, Georgia, Hawaii, Idaho, Illanois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                Wisconsin, Wyoming';
            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        },
        
        // Create filter function for a query string
        createFilterFor: function(query){
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
    };
    
    statesList.states = statesList.loadAll();
    $scope.statesList = statesList;

});