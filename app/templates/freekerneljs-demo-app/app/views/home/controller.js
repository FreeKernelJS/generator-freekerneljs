'use strict';

/**
 * Home page
 */
angular.module('HomeView', [])

.controller('HomeViewController', function($scope){
    $scope.pageTitle = 'Home';
    
    $scope.tiles = [{
        count: 320,
        description: 'Visitors Today',
        type: 'visitors'
    },{
        count: 10,
        description: 'New Users Regitered',
        type: 'users'
    },{
        count: 18,
        description: 'New Tickets',
        type: 'tickets'
    },{
        count: 1560,
        description: 'New Topics',
        type: 'topics'
    }];
    
    $scope.messages = [{
      title: 'Vivamus Aliquam',
      date: 'today 15:08',
      status: 'read'
    }, {
      title: 'Morbi eleifend',
      date: '01/01/2015 10:54',
      status: 'read'
    }, {
      title: 'Dollor ornare',
      date: '04/04/2014 11:05',
      status: 'unread'
    }, {
      title: 'Nulla tellu',
      date: '03/03/2014 05:15',
      status: 'unread'
    }, {
      title: 'In non diam?',
      date: '02/02/2014 22:12',
      status: 'unread'
    }];

    $scope.statusCheck = function(status){
        if(status === 'read'){
            return 'mdi-mail';
        }
        else if(status === 'unread'){
            return 'mdi-drafts';
        }
    };
    
    $scope.tabs = [
      { title: 'Summary'},
      { title: 'Traffic'},
      { title: 'Tags'},
      { title: 'Errors'}
    ];
    
    $scope.data = {
        selectedIndex: 0
    };
    $scope.next = function(){
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2);
    };
    $scope.previous = function(){
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
    
});